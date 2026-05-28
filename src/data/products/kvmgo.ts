import { docsPath, siteConfig } from '../../config/site';
import type { Product } from '../products';

/**
 * KVM-GO marketing payload — cloned from Mini-KVM template (Phase 1D).
 * Sourced from docs/products/kvmgo/ (index, features, reviews, use-cases).
 */
export const kvmgoProduct: Product = {
  slug: 'kvm-go',
  title: "Openterface KVM-GO シリーズ",
  slogan: "キーホルダーに収まる超コンパクトなKVM",
  subtitle: "重要な技術的瞬間のために — 接続。制御。完了。",
  status: 'pre-order',
  description:
    "ビデオコネクタ（HDMI、DisplayPort、またはVGA）を内蔵した次世代のKVM-over-USBソリューション。超コンパクトなキーホルダーサイズで、データセンターやサーバーールームでの迅速なIT運用のために構築されています。",
  seoDescription:
    "Openterface KVM-Goでヘッドレスコンピュータを制御。HDMI/DP/VGA内蔵、キーホルダーサイズ。ITプロフェッショナル向けの4K KVM-over-USB。",
  keywords:
    "KVM-Go, KVM over USB, 超コンパクトKVM, キーホルダーKVM, 4K KVM, ヘッドレス制御",
  heroImage: 'https://assets.openterface.com/images/cover/kvm-go-triple.webp',
  heroImages: [
    'https://assets.openterface.com/images/cover/kvm-go-triple.webp',
    'https://assets.openterface.com/images/cover/kvm-go-triple-2.webp',
  ],
  buyLabel: "今すぐ予約",
  buyHref: siteConfig.links.kvmgoPurchase,
  funding: { amount: "$101,548", date: "2025年12月30日に資金調達完了", backers: "478" },
  painPoints: [
    "従来のKVM機器はかさばり、個別のビデオケーブルが必要",
    "現場での緊急サーバーアクセスにはポケットサイズのツールが必要",
    "ネットワークアクセスのないヘッドレス機器のトラブルシューティングは時間がかかる",
  ],
  solutions: [
    "内蔵ビデオコネクタにより余計なケーブルを排除",
    "常に手の届くところにあるキーホルダー形式",
    "KVM-over-USB — ターゲット側でのネットワークやドライバは不要",
  ],
  hwFeatures: [
    { title: "ビデオ内蔵", description: "HDMI、DisplayPort、VGAモデルを用意。ケーブルの紛失なし。" },
    { title: "キーホルダーサイズ", description: "Openterfaceラインナップの中で最小のKVM-over-USB。" },
    { title: "4K サポート", description: "最新のディスプレイに対応した高解像度キャプチャ。" },
  ],
  swFeatures: [
    { title: "Openterface Qt アプリ", description: "Windows、macOS、Linux向けのクロスプラットフォーム制御。" },
    { title: "MicroSD スイッチ", description: "ポータブルOSイメージやツール用の切り替え可能なストレージ。" },
    { title: "オープンソーススタック", description: "コミュニティ主導のファームウェアとホストアプリケーション。" },
  ],
  specs: [
    { label: "ビデオ", value: "HDMI / DP / VGA (モデルに依存)" },
    { label: "解像度", value: "最大 4K" },
    { label: "接続", value: "USB-C KVM-over-USB" },
  ],
  useCases: [
    "データセンターの巡回",
    "ヘッドレスデバイスのセットアップ",
    "現場ITおよびホームラボのレスキュー",
  ],
  useCaseCards: [
    {
      title: 'Data center & server rooms',
      description: 'Replace rolling crash carts with a keychain KVM that plugs straight in.',
      href: docsPath('/products/kvmgo/use-cases/'),
    },
    {
      title: 'EDC field toolkit',
      description: 'Always in your bag — built-in connector means one less cable to forget.',
      href: docsPath('/products/kvmgo/use-cases/'),
    },
    {
      title: 'Headless homelab rescue',
      description: 'Configure NAS, SBC, and lab nodes without a spare monitor.',
    },
    {
      title: 'Legacy VGA systems',
      description: 'VGA model targets older racks and industrial gear (in development).',
      href: docsPath('/products/kvmgo/features/'),
    },
    {
      title: 'BIOS & firmware access',
      description: 'Boot menus and recovery screens with no network dependency.',
      href: docsPath('/products/kvmgo/features/'),
    },
    {
      title: 'MicroSD OS installs',
      description: 'Switchable storage for imaging and portable recovery tools.',
      href: docsPath('/products/kvmgo/microsd-switch/'),
    },
  ],
  useCasesDocsHref: docsPath('/products/kvmgo/use-cases/'),
  specsDocsHref: docsPath('/products/kvmgo/features/'),
  docsOverviewHref: docsPath('/products/kvmgo/'),
  videoProductSlug: 'kvm-go',
  videoSectionTitle: 'Community reviews & demos',
  socialProofTitle: 'What press & early users say',
  socialProof: [
    {
      quote:
        'Small enough to fit on a keychain, Openterface KVM-GO is a tiny, open-source hardware KVM-over-USB gadget with HDMI, DisplayPort, or VGA connectors.',
      author: 'Jean-Luc Aufranc — CNX Software',
      href: 'https://www.cnx-software.com/2026/01/05/openterface-kvm-go-an-ultra-compact-kvm-over-usb-solution-with-hdmi-dp-or-vga-video-input/',
    },
    {
      quote:
        "Openterface's KVM-GO is a pocket-sized, open source tool for hardware-level access to headless computers.",
      author: 'Hackster News',
      href: 'https://www.hackster.io/news/a-kvm-that-fits-on-your-keychain-e2adb39f7a2b',
    },
    {
      quote:
        'Following the nearly half-million dollar crowdfunding success of the Mini-KVM, Openterface is back with the KVM-GO — a tiny KVM that reduces cable clutter.',
      author: 'Notebookcheck',
      href: 'https://www.notebookcheck.net/KVM-GO-Openterface-is-back-with-a-more-compact-and-refined-KVM.1196402.0.html',
    },
    {
      quote:
        'Keychain-friendly KVM-over-USB gadget comes in a smaller form factor but with upgraded 4K60-capable internals.',
      author: 'Hackster News',
      href: 'https://www.hackster.io/news/techxartisan-is-back-with-a-smaller-yet-more-powerful-openterface-the-openterface-kvm-go-26174b2d11c0',
    },
  ],
  latestNewsHref: 'https://news.openterface.com/',
  latestNewsTitle: 'Latest KVM-GO updates',
  latestNewsSubtitle: 'Production milestones, app releases, and community news.',
  latestNewsLabel: 'Read on Openterface News →',
  docLinks: [
    { label: "機能", href: docsPath("/product/kvm-go/features/") },
    { label: "ベータ版クイックスタート", href: docsPath("/product/kvm-go/beta-quick-start/") },
    { label: "接続方法", href: docsPath("/product/kvm-go/how-to-connect/") },
    { label: "FAQ", href: docsPath("/product/kvm-go/faq/") },
    { label: "アプリをダウンロード", href: docsPath("/app/overview/") },
  ],
  legacyBase: "/products/kvm-go/",
};
