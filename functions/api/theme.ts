import { jsonResponse, requireAuth, type Env } from '../_lib/auth';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const row = await env.DB.prepare('SELECT data FROM theme_settings WHERE id = 1').first<{ data: string }>();
  return jsonResponse({ data: row ? JSON.parse(row.data) : null }, { headers: { 'Cache-Control': 'public, max-age=30' } });
};

export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_json' }, { status: 400 });
  }

  await env.DB.prepare(
    `INSERT INTO theme_settings (id, data, updated_at) VALUES (1, ?, datetime('now'))
     ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`
  )
    .bind(JSON.stringify(body))
    .run();

  return jsonResponse({ ok: true });
};
