import { jsonResponse, requireAuth, type Env } from '../../_lib/auth';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  const { results } = await env.DB.prepare('SELECT * FROM media ORDER BY created_at DESC').all();
  return jsonResponse({ items: results ?? [] });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  const form = await request.formData();
  const file = form.get('file');
  const alt = String(form.get('alt') ?? '');

  if (!(file instanceof File)) {
    return jsonResponse({ error: 'no_file' }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
  const r2Key = `media/${id}-${safeName}`;

  await env.MEDIA.put(r2Key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type || 'application/octet-stream' },
  });

  await env.DB.prepare(
    'INSERT INTO media (id, filename, r2_key, alt, size_bytes) VALUES (?, ?, ?, ?, ?)'
  )
    .bind(id, file.name, r2Key, alt, file.size)
    .run();

  return jsonResponse({ id, filename: file.name, url: `/media/${id}`, alt });
};
