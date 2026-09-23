import { jsonResponse, requireAuth, type Env } from '../../_lib/auth';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const categories = await env.DB.prepare('SELECT * FROM gallery_categories ORDER BY sort_order, label').all();
  const images = await env.DB.prepare(
    `SELECT gi.id, gi.category_slug, gi.alt, gi.sort_order, gi.media_id, m.id as media_id_check
     FROM gallery_images gi JOIN media m ON m.id = gi.media_id
     ORDER BY gi.category_slug, gi.sort_order`
  ).all<{ id: string; category_slug: string; alt: string; sort_order: number; media_id: string }>();

  const items = (images.results ?? []).map((row) => ({
    id: row.id,
    category: row.category_slug,
    alt: row.alt,
    src: `/media/${row.media_id}`,
  }));

  return jsonResponse(
    { categories: categories.results ?? [], images: items },
    { headers: { 'Cache-Control': 'public, max-age=30' } }
  );
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  const body = await request.json<{ media_id: string; category_slug: string; alt?: string; sort_order?: number }>();
  if (!body.media_id || !body.category_slug) {
    return jsonResponse({ error: 'missing_fields' }, { status: 400 });
  }

  const id = crypto.randomUUID();
  await env.DB.prepare(
    'INSERT INTO gallery_images (id, media_id, category_slug, alt, sort_order) VALUES (?, ?, ?, ?, ?)'
  )
    .bind(id, body.media_id, body.category_slug, body.alt ?? '', body.sort_order ?? 0)
    .run();

  return jsonResponse({ id, ok: true });
};
