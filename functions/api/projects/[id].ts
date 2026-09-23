import { jsonResponse, requireAuth, type Env } from '../../_lib/auth';

export const onRequestPatch: PagesFunction<Env> = async ({ request, env, params }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  const id = String(params.id);
  const body = await request.json<{
    slug?: string; title?: string; subtitle?: string; excerpt?: string; description?: string;
    category_slug?: string; sort_order?: number; images?: { media_id: string; alt?: string }[];
  }>();

  const sets: string[] = [];
  const values: unknown[] = [];
  for (const key of ['slug', 'title', 'subtitle', 'excerpt', 'description', 'category_slug', 'sort_order'] as const) {
    if (body[key] !== undefined) {
      sets.push(`${key} = ?`);
      values.push(body[key]);
    }
  }
  if (sets.length > 0) {
    values.push(id);
    await env.DB.prepare(`UPDATE projects SET ${sets.join(', ')} WHERE id = ?`).bind(...values).run();
  }

  if (body.images) {
    await env.DB.prepare('DELETE FROM project_images WHERE project_id = ?').bind(id).run();
    if (body.images.length) {
      const stmts = body.images.map((img, i) =>
        env.DB.prepare('INSERT INTO project_images (id, project_id, media_id, alt, sort_order) VALUES (?, ?, ?, ?, ?)')
          .bind(crypto.randomUUID(), id, img.media_id, img.alt ?? '', i)
      );
      await env.DB.batch(stmts);
    }
  }

  return jsonResponse({ ok: true });
};

export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  await env.DB.prepare('DELETE FROM projects WHERE id = ?').bind(String(params.id)).run();
  return jsonResponse({ ok: true });
};
