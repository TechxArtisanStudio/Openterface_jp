/** Flat marketing URLs from slug-map SSOT (legacy nested slugs → short paths). */
export const PRODUCT_FLAT_PATHS: Record<string, string> = {
  keymod: '/keymod/',
  'kvm-go': '/kvmgo/',
  minikvm: '/minikvm/',
  'uconsole-kvm-extension': '/kvmext/',
  accessories: '/accessories/',
};

export const productsHubOrder = [
  'keymod',
  'kvm-go',
  'minikvm',
  'uconsole-kvm-extension',
  'accessories',
] as const;

export function productFlatPath(slug: string): string {
  return PRODUCT_FLAT_PATHS[slug] ?? `/products/${slug}/`;
}

export const productsHubSeo = {
  title: '製品',
  description:
    'IT プロフェッショナル、開発者、メーカー向けの超コンパクト KVM-over-USB ハードウェアとオープンソースアプリ。',
  keywords: 'Openterface 製品, KeyMod, KVM-GO, Mini-KVM, KVM 拡張, アクセサリー, KVM アプリ',
};
