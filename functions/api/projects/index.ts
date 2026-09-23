import { jsonResponse, requireAuth, type Env } from '../../_lib/auth';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const projects = await env.DB.prepare('SELECT * FROM projects ORDER BY sort_order').all<{
    id: string; slug: string; title: string; subtitle: string; excerpt: string; description: string; category_slug: string; sort_order: number;
  }>();

  const images = await env.DB.prepare(
    'SELECT project_id, media_id, alt, sort_order FROM project_images ORDER BY sort_order'
  ).all<{ project_id: string; media_id: string; alt: string; sort_order: number }>();

  const imagesByProject = new Map<string, { src: string; alt: string }[]>();
  for (const img of images.results ?? []) {
    const list = imagesByProject.get(img.project_id) ?? [];
    list.push({ src: `/media/${img.media_id}`, alt: img.alt });
    imagesByProject.set(img.project_id, list);
  }

  const out = (projects.results ?? []).map((p) => ({
    ...p,
    images: imagesByProject.get(p.id) ?? [],
  }));

  return jsonResponse({ items: out }, { headers: { 'Cache-Control': 'public, max-age=30' } });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  const body = await request.json<{
    slug: string; title: string; subtitle?: string; excerpt?: string; description?: string;
    category_slug?: string; sort_order?: number; images?: { media_id: string; alt?: string }[];
  }>();

  if (!body.slug || !body.title) return jsonResponse({ error: 'missing_fields' }, { status: 400 });

  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO projects (id, slug, title, subtitle, excerpt, description, category_slug, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(id, body.slug, body.title, body.subtitle ?? '', body.excerpt ?? '', body.description ?? '', body.category_slug ?? '', body.sort_order ?? 0)
    .run();

  if (body.images?.length) {
    const stmts = body.images.map((img, i) =>
      env.DB.prepare('INSERT INTO project_images (id, project_id, media_id, alt, sort_order) VALUES (?, ?, ?, ?, ?)')
        .bind(crypto.randomUUID(), id, img.media_id, img.alt ?? '', i)
    );
    await env.DB.batch(stmts);
  }

  return jsonResponse({ id, ok: true });
};
