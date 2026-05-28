import { docsPath, siteConfig } from '../../config/site';
import type { Product } from '../products';

/**
 * Mini-KVM marketing payload — reference template for Phase 1D–1G.
 * Sourced from docs/products/minikvm/ (index, features, reviews).
 */
export const minikvmProduct: Product = {
  slug: 'minikvm',
  title: "Openterface Mini-KVM",
  slogan: "ノートPCをKVMコンソールに",
  subtitle: "テクノロジーライフをシンプルに。",
  status: 'shipping',
  description:
    "プラグアンドプレイのKVM-over-USBソリューション。USBとHDMIを使用して、ノートPCから近くのヘッドレスコンピュータを制御。追加の周辺機器やネットワークは不要です。",
  seoDescription:
    "Openterface Mini-KVM：HDMI対応プラグアンドプレイKVM-over-USB。ネットワークなしでノートPCからヘッドレスコンピュータを制御。",
  keywords:
    "Mini-KVM, KVM over USB, ヘッドレス制御, HDMI KVM, プラグアンドプレイKVM",
  heroImage: 'https://assets.openterface.com/images/cover/mini-kvm-toolkit.webp',
  heroImages: [
    'https://assets.openterface.com/images/cover/mini-kvm-toolkit.webp',
    'https://assets.openterface.com/images/cover/mini-kvm.webp',
  ],
  buyLabel: "今すぐ注文",
  buyHref: siteConfig.links.minikvmPurchase,
  funding: { amount: "$505,471", date: "2024年6月13日に資金調達完了", backers: "3,775" },
  painPoints: [
    "サーバー修理のたびにモニターとキーボードを運ぶのは非現実的",
    "ネットワークKVMは構成と接続が必要",
    "ITプロフェッショナルには毎日使える信頼性の高いポケットKVMが必要",
  ],
  solutions: [
    "既存のノートPCをKVMコンソールとして使用",
    "HDMIキャプチャ + USB HIDを1つのコンパクトなデバイスに集約",
    "2024年以来、5,000人以上のコミュニティメンバーによって実証済み",
  ],
  hwFeatures: [
    { title: "HDMI キャプチャ", description: "ターゲットマシンからホストノートPCへのフルビデオ転送。" },
    { title: "USB スイッチ", description: "ホストとターゲット間でUSBデバイスを切り替え。" },
    { title: "拡張ピン", description: "ハードウェアハッキングやカスタム統合のためのオプション。" },
  ],
  swFeatures: [
    { title: "Qt / macOS / Android アプリ", description: "すべての主要なホストプラットフォーム向けネイティブアプリ。" },
    { title: "オープンソース", description: "完全にオープンなハードウェアとソフトウェアのエコシステム。" },
    { title: "活発なコミュニティ", description: "Discord、GitHub、および定期的なファームウェアアップデート。" },
  ],
  specs: [
    { label: "ビデオ入力", value: "HDMI" },
    { label: "USB", value: "切り替え可能なポート付きUSB-C" },
    { label: "ステータス", value: "出荷中 — Crowd Supply" },
  ],
  useCases: [
    "ホームラボ管理",
    "開発者用ワークステーションの並列制御",
    "ITベンチのトラブルシューティング",
  ],
  useCaseCards: [
    {
      title: 'Data center & server rooms',
      description: 'Replace rolling crash carts with the laptop you already carry.',
      href: docsPath('/minikvm/reviews/'),
    },
    {
      title: 'Homelab & SBC setup',
      description: 'Configure headless Raspberry Pi, NAS, and lab nodes from one laptop.',
    },
    {
      title: 'BIOS & firmware access',
      description: 'Reach boot menus and recovery screens with no network KVM required.',
      href: docsPath('/minikvm/features/'),
    },
    {
      title: 'Developer bench',
      description: 'Side-by-side host/target control without a second monitor.',
    },
    {
      title: 'Kiosk & embedded systems',
      description: 'Field configuration for displays, signage, and appliances.',
    },
    {
      title: 'MSP field toolkit',
      description: 'Quick headless access on customer sites — fast, offline-capable, pocket-sized.',
      href: docsPath('/minikvm/reviews/'),
    },
  ],
  useCasesDocsHref: docsPath('/minikvm/'),
  specsDocsHref: docsPath('/minikvm/features/'),
  docsOverviewHref: docsPath('/minikvm/'),
  videoProductSlug: 'minikvm',
  videoSectionTitle: 'Community reviews & demos',
  socialProofTitle: 'What reviewers & testers say',
  socialProof: [
    {
      quote:
        'Promises to be a low cost, feature packed way to use a laptop as a monitor, keyboard and mouse for accessing servers and other computers.',
      author: 'Cameron Gray — YouTube review',
      href: 'https://www.youtube.com/watch?v=xAEQpWyfY-c',
    },
    {
      quote:
        'A simple gadget concept that has a permanent home on my test bench, turning my laptop into my display, keyboard, and mouse.',
      author: "apalrd's adventures",
      href: 'https://www.youtube.com/watch?v=ZZ5P6MnBcHw',
    },
    {
      quote:
        'Plug-and-play and network-independent KVM-over-USB that establishes a direct HDMI and USB connection between host and target.',
      author: 'Jean-Luc Aufranc — CNX Software',
      href: 'https://www.cnx-software.com/2024/05/09/openterface-mini-kvm-affordable-kvm-over-usb-device/',
    },
    {
      quote:
        "In datacenters it's cool that this totally replaces a crash cart using the laptop you'd already have with you!",
      author: 'samw — tinytoolk.it',
      href: 'https://tinytoolk.it/tools/openterface-kvm/',
    },
    {
      quote:
        'Latency is definitely better than using VNC… Overall a very solid device, it has been a very worthy addition to my daily carry toolkit.',
      author: '65Diamond — r/msp',
      href: 'https://www.reddit.com/r/msp/comments/1j2dlde/comment/mju6uru/',
    },
    {
      quote:
        'An extremely useful tool… The hardware is more than solid and the toolbox also contains all the accessories you need.',
      author: 'Florian Bernd — beta tester',
      href: 'https://blog.flobernd.de/2024/06/openterface-beta-test/',
    },
  ],
  latestNewsHref: 'https://news.openterface.com/',
  latestNewsTitle: 'Latest Mini-KVM updates',
  latestNewsSubtitle: 'Firmware releases, app updates, and community news.',
  latestNewsLabel: 'Read on Openterface News →',
  docLinks: [
    { label: "機能", href: docsPath("/product/minikvm/features/") },
    { label: "USBスイッチ", href: docsPath("/product/minikvm/usb-switch/") },
    { label: "テクニカルサポート", href: docsPath("/product/minikvm/support/") },
    { label: "FAQ", href: docsPath("/product/minikvm/faq/") },
    { label: "アプリをダウンロード", href: docsPath("/app/overview/") },
  ],
  legacyBase: "/products/minikvm/",
};
