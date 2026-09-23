import { jsonResponse, requireAuth, type Env } from '../../_lib/auth';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  const body = await request.json<{ slug: string; label: string; sort_order?: number }>();
  if (!body.slug || !body.label) return jsonResponse({ error: 'missing_fields' }, { status: 400 });

  await env.DB.prepare(
    'INSERT INTO gallery_categories (slug, label, sort_order) VALUES (?, ?, ?) ON CONFLICT(slug) DO UPDATE SET label = excluded.label, sort_order = excluded.sort_order'
  )
    .bind(body.slug, body.label, body.sort_order ?? 0)
    .run();

  return jsonResponse({ ok: true });
};
