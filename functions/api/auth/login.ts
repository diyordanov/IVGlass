import { createSessionCookie, jsonResponse, type Env } from '../../_lib/auth';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_body' }, { status: 400 });
  }

  if (!body.password || body.password !== env.ADMIN_PASSWORD) {
    return jsonResponse({ error: 'invalid_credentials' }, { status: 401 });
  }

  const cookie = await createSessionCookie(env.SESSION_SECRET);
  return jsonResponse({ ok: true }, { headers: { 'Set-Cookie': cookie } });
};
