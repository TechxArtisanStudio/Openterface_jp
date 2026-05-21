import { legacyPath, siteConfig } from '../config/site';

export interface ProductDocLink {
  label: string;
  href: string;
}

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
  buyLabel: string;
  buyHref: string;
  painPoints: string[];
  solutions: string[];
  hwFeatures: { title: string; description: string }[];
  swFeatures: { title: string; description: string }[];
  specs: { label: string; value: string }[];
  useCases: string[];
  funding?: { amount: string; date: string; backers: string };
  docLinks: ProductDocLink[];
  legacyBase: string;
}

export const products: Record<string, Product> = {
  keymod: {
    slug: 'keymod',
    title: 'Openterface KeyMod シリーズ',
    slogan: 'スマートフォンをスマートキーボードに',
    subtitle: 'テクノロジー愛好家、プロフェッショナル、ゲーマーのためのプログラマブルなキーボード＆マウス制御ソリューション。',
    description:
      'スマートフォンをポータブルなキーボードとトラックパッドコンソールに変える、コンパクトでプログラマブルなUSB + Bluetooth HIDエミュレータ。実績のあるOpenterface Mini-KVMのHIDコアをベースに構築されており、プラグアンドプレイで100%オープンソースです。',
    seoDescription:
      'KeyModシリーズはスマートフォンをポータブルなキーボードとトラックパッドに変えます。USB + Bluetooth HIDエミュレータ、オープンソース。キオスク端末やワークフローのショートカットに最適です。',
    keywords: 'KeyMod, HIDエミュレータ, スマートフォンキーボード, Bluetoothキーボード, USBキーボード, オープンソース',
    heroImage: 'https://assets2.openterface.com/images/keymod/2in1.webp',
    heroImages: [
      'https://assets2.openterface.com/images/keymod/2in1.webp',
      'https://assets2.openterface.com/images/keymod/keymod.webp',
      'https://assets2.openterface.com/images/keymod/feature.webp',
    ],
    buyLabel: '今すぐ支援',
    buyHref: siteConfig.links.keymodCrowdsupply,
    painPoints: [
      'キオスクやTVの設定にフルキーボードを持ち運ぶのは現実的ではない',
      '外出先でのワークフローショートカットにプログラマブルなマクロが必要',
      '多くのHIDツールはクローズドソースでカスタマイズが制限されている',
    ],
    solutions: [
      'スマートフォンをポータブルキーボードおよびトラックパッドとして使用',
      'USBとBluetooth HIDを1つのコンパクトなデバイスに統合',
      '100%オープンソースでOpenterfaceアプリのサポート付き',
    ],
    hwFeatures: [
      { title: 'コンパクトなフォームファクタ', description: 'フィールドワークや旅行に最適なポケットサイズ。' },
      { title: 'USB + Bluetooth', description: 'デバイスの互換性を最大化するデュアル接続。' },
      { title: 'オープンハードウェア', description: '実績のあるOpenterface HIDコアに基づいた透明性の高い設計。' },
    ],
    swFeatures: [
      { title: 'KeyMod アプリ', description: 'スマートフォンからマクロ、レイアウト、ゲームパッドプロファイルを構成。' },
      { title: 'クロスプラットフォーム', description: 'Openterfaceアプリを通じてAndroid、iPadOS、デスクトップホストで動作。' },
      { title: 'オープンソース', description: 'コミュニティへの貢献のためにフルスタックがGitHubで公開されています。' },
    ],
    specs: [
      { label: '接続性', value: 'USB-C + Bluetooth LE' },
      { label: 'HID モード', value: 'キーボード、マウス、ゲームパッド' },
      { label: 'ライセンス', value: 'オープンソース ハードウェア＆ソフトウェア' },
    ],
    useCases: ['スマートTV＆キオスク入力', 'モバイルワークフローのマクロ', 'ゲーミング＆アクセシビリティ設定'],
    docLinks: [
      { label: '機能', href: legacyPath('/product/keymod/features/') },
      { label: '同梱物', href: legacyPath('/product/keymod/whats-in-the-box/') },
      { label: '接続方法', href: legacyPath('/product/keymod/how-to-connect/') },
      { label: 'FAQ', href: legacyPath('/product/keymod/faq/') },
      { label: 'KeyModアプリをダウンロード', href: legacyPath('/app/overview/') },
    ],
    legacyBase: '/product/keymod/',
  },
  'kvm-go': {
    slug: 'kvm-go',
    title: 'Openterface KVM-GO シリーズ',
    slogan: 'キーホルダーに収まる超コンパクトなKVM',
    subtitle: '重要な技術的瞬間のために — 接続。制御。完了。',
    description:
      'ビデオコネクタ（HDMI、DisplayPort、またはVGA）を内蔵した次世代のKVM-over-USBソリューション。超コンパクトなキーホルダーサイズで、データセンターやサーバーールームでの迅速なIT運用のために構築されています。',
    seoDescription:
      'Openterface KVM-Goでヘッドレスコンピュータを制御。HDMI/DP/VGA内蔵、キーホルダーサイズ。ITプロフェッショナル向けの4K KVM-over-USB。',
    keywords: 'KVM-Go, KVM over USB, 超コンパクトKVM, キーホルダーKVM, 4K KVM, ヘッドレス制御',
    heroImage: 'https://assets.openterface.com/images/cover/kvm-go-triple.webp',
    heroImages: [
      'https://assets.openterface.com/images/cover/kvm-go-triple.webp',
      'https://assets.openterface.com/images/cover/kvm-go-triple-2.webp',
    ],
    buyLabel: '今すぐ予約',
    buyHref: siteConfig.links.kvmgoPurchase,
    funding: { amount: '$101,548', date: '2025年12月30日に資金調達完了', backers: '478' },
    painPoints: [
      '従来のKVM機器はかさばり、個別のビデオケーブルが必要',
      '現場での緊急サーバーアクセスにはポケットサイズのツールが必要',
      'ネットワークアクセスのないヘッドレス機器のトラブルシューティングは時間がかかる',
    ],
    solutions: [
      '内蔵ビデオコネクタにより余計なケーブルを排除',
      '常に手の届くところにあるキーホルダー形式',
      'KVM-over-USB — ターゲット側でのネットワークやドライバは不要',
    ],
    hwFeatures: [
      { title: 'ビデオ内蔵', description: 'HDMI、DisplayPort、VGAモデルを用意。ケーブルの紛失なし。' },
      { title: 'キーホルダーサイズ', description: 'Openterfaceラインナップの中で最小のKVM-over-USB。' },
      { title: '4K サポート', description: '最新のディスプレイに対応した高解像度キャプチャ。' },
    ],
    swFeatures: [
      { title: 'Openterface Qt アプリ', description: 'Windows、macOS、Linux向けのクロスプラットフォーム制御。' },
      { title: 'MicroSD スイッチ', description: 'ポータブルOSイメージやツール用の切り替え可能なストレージ。' },
      { title: 'オープンソーススタック', description: 'コミュニティ主導のファームウェアとホストアプリケーション。' },
    ],
    specs: [
      { label: 'ビデオ', value: 'HDMI / DP / VGA (モデルに依存)' },
      { label: '解像度', value: '最大 4K' },
      { label: '接続', value: 'USB-C KVM-over-USB' },
    ],
    useCases: ['データセンターの巡回', 'ヘッドレスデバイスのセットアップ', '現場ITおよびホームラボのレスキュー'],
    docLinks: [
      { label: '機能', href: legacyPath('/product/kvm-go/features/') },
      { label: 'ベータ版クイックスタート', href: legacyPath('/product/kvm-go/beta-quick-start/') },
      { label: '接続方法', href: legacyPath('/product/kvm-go/how-to-connect/') },
      { label: 'FAQ', href: legacyPath('/product/kvm-go/faq/') },
      { label: 'アプリをダウンロード', href: legacyPath('/app/overview/') },
    ],
    legacyBase: '/product/kvm-go/',
  },
  minikvm: {
    slug: 'minikvm',
    title: 'Openterface Mini-KVM',
    slogan: 'ノートPCをKVMコンソールに',
    subtitle: 'テクノロジーライフをシンプルに。',
    description:
      'プラグアンドプレイのKVM-over-USBソリューション。USBとHDMIを使用して、ノートPCから近くのヘッドレスコンピュータを制御。追加の周辺機器やネットワークは不要です。',
    seoDescription:
      'Openterface Mini-KVM：HDMI対応プラグアンドプレイKVM-over-USB。ネットワークなしでノートPCからヘッドレスコンピュータを制御。',
    keywords: 'Mini-KVM, KVM over USB, ヘッドレス制御, HDMI KVM, プラグアンドプレイKVM',
    heroImage: 'https://assets.openterface.com/images/cover/mini-kvm-toolkit.webp',
    heroImages: [
      'https://assets.openterface.com/images/cover/mini-kvm-toolkit.webp',
      'https://assets.openterface.com/images/cover/mini-kvm.webp',
    ],
    buyLabel: '今すぐ注文',
    buyHref: siteConfig.links.minikvmPurchase,
    funding: { amount: '$505,471', date: '2024年6月13日に資金調達完了', backers: '3,775' },
    painPoints: [
      'サーバー修理のたびにモニターとキーボードを運ぶのは非現実的',
      'ネットワークKVMは構成と接続が必要',
      'ITプロフェッショナルには毎日使える信頼性の高いポケットKVMが必要',
    ],
    solutions: [
      '既存のノートPCをKVMコンソールとして使用',
      'HDMIキャプチャ + USB HIDを1つのコンパクトなデバイスに集約',
      '2024年以来、5,000人以上のコミュニティメンバーによって実証済み',
    ],
    hwFeatures: [
      { title: 'HDMI キャプチャ', description: 'ターゲットマシンからホストノートPCへのフルビデオ転送。' },
      { title: 'USB スイッチ', description: 'ホストとターゲット間でUSBデバイスを切り替え。' },
      { title: '拡張ピン', description: 'ハードウェアハッキングやカスタム統合のためのオプション。' },
    ],
    swFeatures: [
      { title: 'Qt / macOS / Android アプリ', description: 'すべての主要なホストプラットフォーム向けネイティブアプリ。' },
      { title: 'オープンソース', description: '完全にオープンなハードウェアとソフトウェアのエコシステム。' },
      { title: '活発なコミュニティ', description: 'Discord、GitHub、および定期的なファームウェアアップデート。' },
    ],
    specs: [
      { label: 'ビデオ入力', value: 'HDMI' },
      { label: 'USB', value: '切り替え可能なポート付きUSB-C' },
      { label: 'ステータス', value: '出荷中 — Crowd Supply' },
    ],
    useCases: ['ホームラボ管理', '開発者用ワークステーションの並列制御', 'ITベンチのトラブルシューティング'],
    docLinks: [
      { label: '機能', href: legacyPath('/product/minikvm/features/') },
      { label: 'USBスイッチ', href: legacyPath('/product/minikvm/usb-switch/') },
      { label: 'テクニカルサポート', href: legacyPath('/product/minikvm/support/') },
      { label: 'FAQ', href: legacyPath('/product/minikvm/faq/') },
      { label: 'アプリをダウンロード', href: legacyPath('/app/overview/') },
    ],
    legacyBase: '/product/minikvm/',
  },
  'uconsole-kvm-extension': {
    slug: 'uconsole-kvm-extension',
    title: 'uConsole KVM Extension',
    slogan: 'uConsoleにKVMのパワーを',
    subtitle: 'ポータブルなuConsoleをフルKVM端末に変えます。',
    description:
      'Clockwork uConsoleにKVM-over-USB機能を追加するハードウェア拡張。内蔵キーボードとディスプレイを備えたポータブルなIT作業に最適です。',
    seoDescription:
      'uConsole KVM Extensionは、Clockwork uConsoleポータブルコンピュータにKVM-over-USB機能を追加します。',
    keywords: 'uConsole, KVM拡張, ポータブルKVM, Clockwork uConsole',
    heroImage: 'https://assets.openterface.com/images/uconsole-kvm-extension/uconsole-kvm-extension-1.webp',
    heroImages: [
      'https://assets.openterface.com/images/uconsole-kvm-extension/uconsole-kvm-extension-1.webp',
    ],
    buyLabel: '詳しくはこちら',
    buyHref: legacyPath('/product/uconsole-kvm-extension/'),
    painPoints: [
      'ポータブルコンソールにヘッドレス機器用の統合KVM機能がない',
      '現場技術者は1つのデバイスですべてをこなしたい',
    ],
    solutions: [
      'uConsoleネイティブのフォームファクタ拡張ボード',
      'ポケットサイズのデバイスで完全なOpenterface KVMスタックを実行',
    ],
    hwFeatures: [
      { title: 'uConsole ネイティブ', description: 'Clockwork uConsole専用に設計。' },
      { title: 'コンパクトなPCB', description: 'uConsoleの筐体内に取り付け可能。' },
    ],
    swFeatures: [
      { title: 'Openterface アプリ', description: 'Mini-KVMやKVM-GOと同じ信頼性の高いソフトウェア。' },
      { title: 'セットアップガイド', description: 'ステップバイステップのハードウェアおよびソフトウェアインストールドキュメント。' },
    ],
    specs: [
      { label: '互換性', value: 'Clockwork uConsole' },
      { label: '認証', value: 'OSHWA 認証済み' },
    ],
    useCases: ['ポータブルデータセンターツール', '外出先でのメイカー＆ホームラボ'],
    docLinks: [
      { label: 'ハードウェアインストール', href: legacyPath('/product/uconsole-kvm-extension/hardware-installation/') },
      { label: 'ソフトウェアセットアップ', href: legacyPath('/product/uconsole-kvm-extension/software-setup/') },
      { label: '接続方法', href: legacyPath('/product/uconsole-kvm-extension/connect-to-target/') },
      { label: 'FAQ', href: legacyPath('/product/uconsole-kvm-extension/faq/') },
    ],
    legacyBase: '/product/uconsole-kvm-extension/',
  },
  accessories: {
    slug: 'accessories',
    title: 'Openterface アクセサリー',
    slogan: 'セットアップを完璧に',
    subtitle: 'プロフェッショナル向けの高品位ケーブル、アダプタ、ツールキットバッグ。',
    description:
      'ビデオアダプタ、高速ケーブル、ストレージソリューションなどの必須アクセサリ。TxAショップの高品質なギアでOpenterfaceの体験を向上させましょう。',
    seoDescription: 'Openterfaceアクセサリ — ケーブル、アダプタ、ツールキットバッグ、ビデオコネクタ。',
    keywords: 'KVMアクセサリ, HDMIケーブル, USB-Cケーブル, ツールキットバッグ',
    heroImage: 'https://assets.openterface.com/images/cover.webp',
    heroImages: ['https://assets.openterface.com/images/cover.webp'],
    buyLabel: '今すぐ購入',
    buyHref: siteConfig.links.shop,
    painPoints: ['現場で適切なケーブルがないと、すべての修理が遅れる'],
    solutions: ['Openterface製品でテストされた厳選されたアクセサリ'],
    hwFeatures: [
      { title: 'ビデオアダプタ', description: 'HDMI、VGA、および特殊コネクタ。' },
      { title: '高速ケーブル', description: 'KVMワークロード向けに構築されたUSB-CおよびType-Aケーブル。' },
      { title: 'ツールキットバッグ', description: 'Openterfaceキット一式を整理。' },
    ],
    swFeatures: [],
    specs: [],
    useCases: ['フィールドキットの整理', 'ビデオ形式の変換', 'IT用予備ケーブル'],
    docLinks: [
      { label: 'すべての製品', href: legacyPath('/product/accessories/') },
      { label: 'TxA ショップ', href: siteConfig.links.shop },
    ],
    legacyBase: '/product/accessories/',
  },
};

export const productSlugs = Object.keys(products);
