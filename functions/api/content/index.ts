import { jsonResponse, type Env } from '../../_lib/auth';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.DB.prepare('SELECT section, data FROM page_content').all<{ section: string; data: string }>();
  const out: Record<string, unknown> = {};
  for (const row of results ?? []) {
    out[row.section] = JSON.parse(row.data);
  }
  return jsonResponse(out, { headers: { 'Cache-Control': 'public, max-age=30' } });
};
