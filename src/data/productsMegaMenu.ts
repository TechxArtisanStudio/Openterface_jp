import { docsPath } from '../config/site';
import { localeNavLabels } from '../i18n/nav';
import { products } from './products';
import { productFlatPath, productsHubOrder } from './productPaths';

export interface ProductsMegaMenuItem {
  slug: string;
  href: string;
  title: string;
  slogan: string;
  heroImage: string;
  docsHref: string;
  docsLabel: string;
  faqHref?: string;
  faqLabel?: string;
}

/** Products that have a dedicated docs FAQ page. */
const productsWithFaq = new Set(['keymod', 'kvm-go', 'minikvm', 'uconsole-kvm-extension']);

export function getProductsMegaMenuItems(): ProductsMegaMenuItem[] {
  const labels = localeNavLabels;
  return productsHubOrder.flatMap((slug) => {
    const product = products[slug];
    if (!product) return [];
    const docsSlug =
      slug === 'kvm-go' ? 'kvmgo' : slug === 'uconsole-kvm-extension' ? 'kvmext' : slug;
    const item: ProductsMegaMenuItem = {
      slug,
      href: productFlatPath(slug),
      title: product.title,
      slogan: product.slogan,
      heroImage:
        slug === 'keymod'
          ? '/keymod/rebirth/hero-center.webp'
          : slug === 'uconsole-kvm-extension'
            ? 'https://assets.openterface.com/images/product/kvmext-v2/kvmext-v2-pcb-detail.webp'
            : slug === 'accessories'
              ? 'https://assets.openterface.com/images/product/part/CABLE100-VGA2HDMI-1.webp'
              : product.heroImage,
      docsHref: product.docsOverviewHref ?? docsPath(`/products/${docsSlug}/`),
      docsLabel: labels.productDocs,
    };
    if (productsWithFaq.has(slug)) {
      item.faqHref = docsPath(`/products/${docsSlug}/faq/`);
      item.faqLabel = labels.productFaqs;
    }
    return [item];
  });
}

/** Hub link for mobile accordion / Apps mega-menu footer. */
export function productsMegaMenuAllDocs() {
  return {
    href: docsPath(),
    label: localeNavLabels.allDocumentation,
  };
}
