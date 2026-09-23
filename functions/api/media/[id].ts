import { jsonResponse, requireAuth, type Env } from '../../_lib/auth';

export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  const id = String(params.id);
  const row = await env.DB.prepare('SELECT r2_key FROM media WHERE id = ?').bind(id).first<{ r2_key: string }>();
  if (!row) return jsonResponse({ error: 'not_found' }, { status: 404 });

  await env.MEDIA.delete(row.r2_key);
  await env.DB.prepare('DELETE FROM media WHERE id = ?').bind(id).run();

  return jsonResponse({ ok: true });
};

export const onRequestPatch: PagesFunction<Env> = async ({ request, env, params }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  const id = String(params.id);
  let body: { alt?: string };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_json' }, { status: 400 });
  }

  await env.DB.prepare('UPDATE media SET alt = ? WHERE id = ?').bind(body.alt ?? '', id).run();
  return jsonResponse({ ok: true });
};
