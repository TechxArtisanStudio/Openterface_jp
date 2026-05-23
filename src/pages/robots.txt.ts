import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const sitemap = new URL('sitemap-index.xml', import.meta.env.SITE).href;
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
