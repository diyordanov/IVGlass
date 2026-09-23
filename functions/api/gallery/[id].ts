import { jsonResponse, requireAuth, type Env } from '../../_lib/auth';

export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  await env.DB.prepare('DELETE FROM gallery_images WHERE id = ?').bind(String(params.id)).run();
  return jsonResponse({ ok: true });
};

export const onRequestPatch: PagesFunction<Env> = async ({ request, env, params }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  const body = await request.json<{ alt?: string; category_slug?: string; sort_order?: number }>();
  const sets: string[] = [];
  const values: unknown[] = [];
  if (body.alt !== undefined) { sets.push('alt = ?'); values.push(body.alt); }
  if (body.category_slug !== undefined) { sets.push('category_slug = ?'); values.push(body.category_slug); }
  if (body.sort_order !== undefined) { sets.push('sort_order = ?'); values.push(body.sort_order); }
  if (sets.length === 0) return jsonResponse({ ok: true });

  values.push(String(params.id));
  await env.DB.prepare(`UPDATE gallery_images SET ${sets.join(', ')} WHERE id = ?`).bind(...values).run();
  return jsonResponse({ ok: true });
};
