import { minikvmProduct } from './products/minikvm';
import { kvmgoProduct } from './products/kvmgo';
import { keymodProduct } from './products/keymod';
import { kvmextProduct } from './products/kvmext';
import { accessoriesProduct } from './products/accessories';

export interface ProductDocLink {
  label: string;
  href: string;
}

export interface ProductUseCaseCard {
  title: string;
  description?: string;
  href?: string;
}

export interface ProductSocialQuote {
  quote: string;
  author: string;
  href?: string;
}

export type ProductStatus = 'shipping' | 'pre-order' | 'pre-launch' | 'oshwa';

export interface Product {
  slug: string;
  title: string;
  slogan: string;
  subtitle: string;
  description: string;
  seoDescription: string;
  keywords: string;
  heroImage: string;
  heroImages: string[];
  /** Optional hero video embed (YouTube nocookie URL). */
  heroVideoEmbedUrl?: string;
  buyLabel: string;
  buyHref: string;
  /** Shipping / pre-order badge shown in ProductLandingV2 hero. */
  status?: ProductStatus;
  painPoints: string[];
  solutions: string[];
  hwFeatures: { title: string; description: string }[];
  swFeatures: { title: string; description: string }[];
  specs: { label: string; value: string }[];
  useCases: string[];
  /** Rich use-case cards for ProductLandingV2 strip. Falls back to useCases strings. */
  useCaseCards?: ProductUseCaseCard[];
  useCasesDocsHref?: string;
  specsDocsHref?: string;
  docsOverviewHref?: string;
  funding?: { amount: string; date: string; backers: string };
  socialProof?: ProductSocialQuote[];
  socialProofTitle?: string;
  /** catalogVideos.ts product key (may differ from marketing slug, e.g. kvm-go). */
  videoProductSlug?: string;
  videoSectionTitle?: string;
  latestNewsHref?: string;
  latestNewsTitle?: string;
  latestNewsSubtitle?: string;
  latestNewsLabel?: string;
  docLinks: ProductDocLink[];
  legacyBase: string;
}

export const products: Record<string, Product> = {
  keymod: keymodProduct,
  'kvm-go': kvmgoProduct,
  minikvm: minikvmProduct,
  'uconsole-kvm-extension': kvmextProduct,
  accessories: accessoriesProduct,
};

export const productSlugs = Object.keys(products);
