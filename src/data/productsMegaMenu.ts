import { products } from './products';
import { productFlatPath, productsHubOrder } from './productPaths';

export interface ProductsMegaMenuItem {
  slug: string;
  href: string;
  title: string;
  slogan: string;
  subtitle: string;
  heroImage: string;
}

export function getProductsMegaMenuItems(): ProductsMegaMenuItem[] {
  return productsHubOrder.flatMap((slug) => {
    const product = products[slug];
    if (!product) return [];
    return [
      {
        slug,
        href: productFlatPath(slug),
        title: product.title,
        slogan: product.slogan,
        subtitle: product.subtitle,
        heroImage:
          slug === 'keymod'
            ? '/keymod/rebirth/hero-center.webp'
            : slug === 'uconsole-kvm-extension'
              ? 'https://assets.openterface.com/images/product/kvmext-v2/kvmext-v2-pcb-detail.webp'
              : slug === 'accessories'
                ? 'https://assets.openterface.com/images/product/part/CABLE100-VGA2HDMI-1.webp'
                : product.heroImage,
      },
    ];
  });
}
