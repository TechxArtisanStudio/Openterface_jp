import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const site = import.meta.env.SITE;
  const hub = new URL('sitemap_index.xml', site).href;
  const locale = new URL('sitemap-index.xml', site).href;
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${hub}`,
    `Sitemap: ${locale}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
