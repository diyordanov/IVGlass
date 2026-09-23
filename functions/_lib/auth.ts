export interface Env {
  DB: D1Database;
  MEDIA: R2Bucket;
  ADMIN_PASSWORD: string;
  SESSION_SECRET: string;
}

const COOKIE_NAME = 'ivg_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return toHex(sig);
}

export async function createSessionCookie(secret: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${exp}`;
  const sig = await hmac(secret, payload);
  const token = `${payload}.${sig}`;
  return `${COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

function getCookie(request: Request, name: string): string | null {
  const header = request.headers.get('Cookie') ?? '';
  const match = header.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export async function isAuthenticated(request: Request, env: Env): Promise<boolean> {
  const token = getCookie(request, COOKIE_NAME);
  if (!token) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = await hmac(env.SESSION_SECRET, payload);
  if (expected !== sig) return false;
  const exp = parseInt(payload, 10);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  return true;
}

export function jsonResponse(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  });
}

export async function requireAuth(request: Request, env: Env): Promise<Response | null> {
  const ok = await isAuthenticated(request, env);
  if (!ok) return jsonResponse({ error: 'unauthorized' }, { status: 401 });
  return null;
}
