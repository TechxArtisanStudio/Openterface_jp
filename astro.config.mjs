// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // site-refactor-redirects:start
  redirects: {
    '/products/keymod/': '/keymod/',
    '/products/kvm-go/': '/kvmgo/',
    '/products/minikvm/': '/minikvm/',
    '/products/uconsole-kvm-extension/': '/kvmext/',
    '/products/accessories/': '/accessories/',
    '/use-cases/': '/products/',
    '/app/': '/apps/',
    '/videos/': '/media/',
  },
    // site-refactor-redirects:end
  site: 'https://jp.openterface.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      namespaces: { news: false, video: false, xhtml: false },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
