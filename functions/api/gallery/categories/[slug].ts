import { jsonResponse, requireAuth, type Env } from '../../../_lib/auth';

export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  await env.DB.prepare('DELETE FROM gallery_categories WHERE slug = ?').bind(String(params.slug)).run();
  return jsonResponse({ ok: true });
};
