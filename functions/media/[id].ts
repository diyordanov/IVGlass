import type { Env } from '../_lib/auth';

export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  const id = String(params.id);
  const row = await env.DB.prepare('SELECT r2_key FROM media WHERE id = ?').bind(id).first<{ r2_key: string }>();
  if (!row) return new Response('Not found', { status: 404 });

  const object = await env.MEDIA.get(row.r2_key);
  if (!object) return new Response('Not found', { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('ETag', object.httpEtag);

  return new Response(object.body, { headers });
};
