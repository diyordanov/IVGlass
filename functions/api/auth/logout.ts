import { clearSessionCookie, jsonResponse } from '../../_lib/auth';

export const onRequestPost: PagesFunction = async () => {
  return jsonResponse({ ok: true }, { headers: { 'Set-Cookie': clearSessionCookie() } });
};
