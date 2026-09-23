import { jsonResponse, requireAuth, type Env } from '../../_lib/auth';

export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  const section = String(params.section);
  const row = await env.DB.prepare('SELECT data FROM page_content WHERE section = ?').bind(section).first<{ data: string }>();
  if (!row) return jsonResponse({ section, data: null });
  return jsonResponse({ section, data: JSON.parse(row.data) });
};

export const onRequestPut: PagesFunction<Env> = async ({ request, env, params }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  const section = String(params.section);
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_json' }, { status: 400 });
  }

  await env.DB.prepare(
    `INSERT INTO page_content (section, data, updated_at) VALUES (?, ?, datetime('now'))
     ON CONFLICT(section) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`
  )
    .bind(section, JSON.stringify(body))
    .run();

  return jsonResponse({ ok: true });
};
