import { docsPath, siteConfig } from '../../config/site';
import type { Product } from '../products';

/**
 * KeyMod marketing payload — Phase 1E flat landing at /keymod/.
 * Sourced from docs/products/keymod/ (index, features, use-cases).
 */
export const keymodProduct: Product = {
  slug: 'keymod',
  title: "Openterface KeyMod シリーズ",
  slogan: "スマートフォンをスマートキーボードに",
  subtitle: "テクノロジー愛好家、プロフェッショナル、ゲーマーのためのプログラマブルなキーボード＆マウス制御ソリューション。",
  status: 'pre-launch',
  description:
    "スマートフォンをポータブルなキーボードとトラックパッドコンソールに変える、コンパクトでプログラマブルなUSB + Bluetooth HIDエミュレータ。実績のあるOpenterface Mini-KVMのHIDコアをベースに構築されており、プラグアンドプレイで100%オープンソースです。",
  seoDescription:
    "KeyModシリーズはスマートフォンをポータブルなキーボードとトラックパッドに変えます。USB + Bluetooth HIDエミュレータ、オープンソース。キオスク端末やワークフローのショートカットに最適です。",
  keywords:
    "KeyMod, HIDエミュレータ, スマートフォンキーボード, Bluetoothキーボード, USBキーボード, オープンソース",
  heroImage: 'https://assets2.openterface.com/images/keymod/2in1.webp',
  heroImages: [
    'https://assets2.openterface.com/images/keymod/2in1.webp',
    'https://assets2.openterface.com/images/keymod/keymod.webp',
    'https://assets2.openterface.com/images/keymod/feature.webp',
  ],
  buyLabel: "今すぐ支援",
  buyHref: siteConfig.links.keymodCrowdsupply,
  painPoints: [
    "キオスクやTVの設定にフルキーボードを持ち運ぶのは現実的ではない",
    "外出先でのワークフローショートカットにプログラマブルなマクロが必要",
    "多くのHIDツールはクローズドソースでカスタマイズが制限されている",
  ],
  solutions: [
    "スマートフォンをポータブルキーボードおよびトラックパッドとして使用",
    "USBとBluetooth HIDを1つのコンパクトなデバイスに統合",
    "100%オープンソースでOpenterfaceアプリのサポート付き",
  ],
  hwFeatures: [
    { title: "コンパクトなフォームファクタ", description: "フィールドワークや旅行に最適なポケットサイズ。" },
    { title: "USB + Bluetooth", description: "デバイスの互換性を最大化するデュアル接続。" },
    { title: "オープンハードウェア", description: "実績のあるOpenterface HIDコアに基づいた透明性の高い設計。" },
  ],
  swFeatures: [
    { title: "KeyMod アプリ", description: "スマートフォンからマクロ、レイアウト、ゲームパッドプロファイルを構成。" },
    { title: "クロスプラットフォーム", description: "Openterfaceアプリを通じてAndroid、iPadOS、デスクトップホストで動作。" },
    { title: "オープンソース", description: "コミュニティへの貢献のためにフルスタックがGitHubで公開されています。" },
  ],
  specs: [
    { label: "接続性", value: "USB-C + Bluetooth LE" },
    { label: "HID モード", value: "キーボード、マウス、ゲームパッド" },
    { label: "ライセンス", value: "オープンソース ハードウェア＆ソフトウェア" },
  ],
  useCases: [
    "スマートTV＆キオスク入力",
    "モバイルワークフローのマクロ",
    "ゲーミング＆アクセシビリティ設定",
  ],
  useCaseCards: [
    {
      title: 'Outdoor display computers',
      description: 'Configure and troubleshoot outdoor PCs without carrying a keyboard.',
      href: docsPath('/keymod/use-cases/'),
    },
    {
      title: 'LED signage players',
      description: 'On-site updates to signage controllers — phone as full keyboard.',
      href: docsPath('/keymod/use-cases/'),
    },
    {
      title: 'Kiosks',
      description: 'Debug, configure, or maintain kiosks with immediate HID access.',
      href: docsPath('/keymod/use-cases/'),
    },
    {
      title: 'Smart TVs & set-top boxes',
      description: 'Full keyboard and trackpad when the remote is not enough.',
    },
    {
      title: 'Quick workflow shortcuts',
      description: 'Developers and IT staff — occasional input without extra gear.',
      href: docsPath('/keymod/use-cases/'),
    },
    {
      title: 'Portable & plug-and-play',
      description: 'Your phone is always with you; KeyMod stays compact in your bag.',
    },
  ],
  useCasesDocsHref: docsPath('/keymod/use-cases/'),
  specsDocsHref: docsPath('/keymod/features/'),
  docsOverviewHref: docsPath('/keymod/'),
  videoProductSlug: 'keymod',
  videoSectionTitle: 'Community reviews & demos',
  latestNewsHref: 'https://news.openterface.com/',
  latestNewsTitle: 'Latest KeyMod updates',
  latestNewsSubtitle: 'Beta releases, app updates, and pre-launch news.',
  latestNewsLabel: 'Read on Openterface News →',
  docLinks: [
    { label: "機能", href: docsPath("/product/keymod/features/") },
    { label: "同梱物", href: docsPath("/product/keymod/whats-in-the-box/") },
    { label: "接続方法", href: docsPath("/product/keymod/how-to-connect/") },
    { label: "FAQ", href: docsPath("/product/keymod/faq/") },
    { label: "KeyModアプリをダウンロード", href: docsPath("/app/overview/") },
  ],
  legacyBase: "/products/keymod/",
};
