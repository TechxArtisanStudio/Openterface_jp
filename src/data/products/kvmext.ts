import { docsPath, siteConfig } from '../../config/site';
import type { Product } from '../products';

const KVMEXT_SHOP =
  'https://shop.techxartisan.com/products/openterface-kvm-ext-for-uconsole';

/**
 * KVM Extension (uConsole) marketing payload — Phase 1F flat landing at /kvmext/.
 * Sourced from docs/products/kvmext/ (index, features).
 */
export const kvmextProduct: Product = {
  slug: 'uconsole-kvm-extension',
  title: "uConsole KVM Extension",
  slogan: "uConsoleにKVMのパワーを",
  subtitle: "ポータブルなuConsoleをフルKVM端末に変えます。",
  status: 'oshwa',
  description:
    "Clockwork uConsoleにKVM-over-USB機能を追加するハードウェア拡張。内蔵キーボードとディスプレイを備えたポータブルなIT作業に最適です。",
  seoDescription:
    "uConsole KVM Extensionは、Clockwork uConsoleポータブルコンピュータにKVM-over-USB機能を追加します。",
  keywords:
    "uConsole, KVM拡張, ポータブルKVM, Clockwork uConsole",
  heroImage:
    'https://assets.openterface.com/images/cover/uconsole.webp',
  heroImages: [
    'https://assets.openterface.com/images/cover/uconsole.webp',
    'https://assets.openterface.com/images/product/openterface-kvm-uconsole-extension.webp',
  ],
  buyLabel: "詳しくはこちら",
  buyHref: KVMEXT_SHOP,
  painPoints: [
    "ポータブルコンソールにヘッドレス機器用の統合KVM機能がない",
    "現場技術者は1つのデバイスですべてをこなしたい",
  ],
  solutions: [
    "uConsoleネイティブのフォームファクタ拡張ボード",
    "ポケットサイズのデバイスで完全なOpenterface KVMスタックを実行",
  ],
  hwFeatures: [
    { title: "uConsole ネイティブ", description: "Clockwork uConsole専用に設計。" },
    { title: "コンパクトなPCB", description: "uConsoleの筐体内に取り付け可能。" },
  ],
  swFeatures: [
    { title: "Openterface アプリ", description: "Mini-KVMやKVM-GOと同じ信頼性の高いソフトウェア。" },
    { title: "セットアップガイド", description: "ステップバイステップのハードウェアおよびソフトウェアインストールドキュメント。" },
  ],
  specs: [
    { label: "互換性", value: "Clockwork uConsole" },
    { label: "認証", value: "OSHWA 認証済み" },
  ],
  useCases: [
    "ポータブルデータセンターツール",
    "外出先でのメイカー＆ホームラボ",
  ],
  useCaseCards: [
    {
      title: 'Portable datacenter tool',
      description: 'Walk racks with your uConsole — one device for display, keyboard, and KVM.',
      href: docsPath('/products/kvmext/'),
    },
    {
      title: 'Maker & homelab on the go',
      description: 'Configure headless SBCs, NAS nodes, and lab gear from a pocketable console.',
      href: docsPath('/products/kvmext/features/'),
    },
    {
      title: 'Field IT & MSP visits',
      description: 'BIOS access and quick fixes without hauling a crash cart.',
    },
    {
      title: 'Network-free troubleshooting',
      description: 'When the target has no IP — HDMI + HID still works.',
      href: docsPath('/products/kvmext/connect-to-target/'),
    },
  ],
  useCasesDocsHref: docsPath('/products/kvmext/'),
  specsDocsHref: docsPath('/products/kvmext/features/'),
  docsOverviewHref: docsPath('/products/kvmext/'),
  videoProductSlug: 'uconsole-kvm-extension',
  videoSectionTitle: 'Installation & community demos',
  latestNewsHref: `${siteConfig.links.news}/products/kvmext/2025-08-28-oshwa-certification/`,
  latestNewsTitle: 'OSHWA certification achieved',
  latestNewsSubtitle: 'Official Open Source Hardware Association certification for the uConsole KVM Extension.',
  latestNewsLabel: 'Read on Openterface News →',
  docLinks: [
    { label: "ハードウェアインストール", href: docsPath("/product/uconsole-kvm-extension/hardware-installation/") },
    { label: "ソフトウェアセットアップ", href: docsPath("/product/uconsole-kvm-extension/software-setup/") },
    { label: "接続方法", href: docsPath("/product/uconsole-kvm-extension/connect-to-target/") },
    { label: "FAQ", href: docsPath("/product/uconsole-kvm-extension/faq/") },
  ],
  legacyBase: "/products/uconsole-kvm-extension/",
};
