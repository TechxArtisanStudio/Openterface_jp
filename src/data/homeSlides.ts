import { siteConfig } from '../config/site';

export interface HomeSlide {
  id: number;
  category: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  images?: string[];
  primaryCta?: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string; external?: boolean };
  funding?: { amount: string; date: string; backers: string };
  progressSmall: string;
  progressLarge: string;
}

export const homeSlides: HomeSlide[] = [
  {
    id: 1,
    category: 'KeyMod シリーズ',
    headline: 'スマートフォンをミニキーボードに',
    description:
      'スマートフォンをポータブルなキーボードとトラックパッドに変える、コンパクトなUSB + Bluetooth HIDエミュレータ。プラグアンドプレイで100%オープンソース。キオスク端末、スマートTVのメンテナンス、ワークフローのクイックショートカットに最適です。',
    image: 'https://assets2.openterface.com/images/keymod/2in1.webp',
    imageAlt: 'Openterface KeyMod シリーズ',
    images: [
      'https://assets2.openterface.com/images/keymod/2in1.webp',
      'https://assets2.openterface.com/images/keymod/keymod.webp',
      'https://assets2.openterface.com/images/keymod/feature.webp',
    ],
    primaryCta: { label: '今すぐ支援', href: siteConfig.links.keymodCrowdsupply, external: true },
    secondaryCta: { label: '製品を見る', href: '/products/keymod/' },
    progressSmall: 'KeyMod シリーズ',
    progressLarge: 'スマートフォンをミニキーボードに',
  },
  {
    id: 2,
    category: 'KVM-GO シリーズ',
    headline: 'キーホルダーに収まる超コンパクトなKVM',
    description:
      'キーホルダーに収まるサイズで設計され、技術的な課題を即座に解決。現場での迅速なIT運用のために構築された次世代のKVM-over-USBガジェットです。',
    image: 'https://assets.openterface.com/images/cover/kvm-go-triple.webp',
    imageAlt: 'KVM-GO シリーズ',
    images: [
      'https://assets.openterface.com/images/cover/kvm-go-triple.webp',
      'https://assets.openterface.com/images/cover/kvm-go-triple-2.webp',
    ],
    primaryCta: { label: '今すぐ予約', href: siteConfig.links.kvmgoPurchase, external: true },
    secondaryCta: { label: '製品を見る', href: '/products/kvm-go/' },
    funding: { amount: '$101,548', date: '2025年12月30日に資金調達完了', backers: '478' },
    progressSmall: 'KVM-GO シリーズ',
    progressLarge: 'キーホルダーに収まる超コンパクトなKVM',
  },
  {
    id: 3,
    category: 'Mini-KVM シリーズ',
    headline: 'プロフェッショナルのためのコンパクトなKVMソリューション',
    description:
      '即時のITタスクやトラブルシューティングに対応し、テクノロジーライフをシンプルにする、コンパクトで機能豊富なオープンソースのKVM-over-USBソリューション。',
    image: 'https://assets.openterface.com/images/cover/mini-kvm-toolkit.webp',
    imageAlt: 'Openterface Mini-KVM',
    images: [
      'https://assets.openterface.com/images/cover/mini-kvm-toolkit.webp',
      'https://assets.openterface.com/images/cover/mini-kvm.webp',
    ],
    primaryCta: { label: '今すぐ注文', href: siteConfig.links.minikvmPurchase, external: true },
    secondaryCta: { label: '製品を見る', href: '/products/minikvm/' },
    funding: { amount: '$505,471', date: '2024年6月13日に資金調達完了', backers: '3,775' },
    progressSmall: 'Mini-KVM シリーズ',
    progressLarge: 'プロフェッショナルのためのコンパクトなKVMソリューション',
  },
  {
    id: 4,
    category: 'TxA ショップ',
    headline: 'プレミアムなアクセサリーでセットアップを完璧に',
    description:
      'ビデオアダプタ、高速ケーブル、ストレージソリューションなどの必須アクセサリを探索。プロフェッショナル向けに設計された高品質なアクセサリでOpenterfaceの体験を向上させましょう。',
    image: 'https://assets.openterface.com/images/cover.webp',
    imageAlt: 'TxA ショップ アクセサリー',
    primaryCta: { label: '今すぐ購入', href: siteConfig.links.shop, external: true },
    secondaryCta: { label: 'アクセサリーを見る', href: '/products/accessories/' },
    progressSmall: 'TxA ショップ',
    progressLarge: 'プレミアムなアクセサリーでセットアップを完璧に',
  },
];

export const homeSeo = {
  title: 'Openterface | ITプロフェッショナル向けの超コンパクトなKVMソリューション',
  description:
    'Openterfaceを探索 — KVM-GOシリーズ（キーホルダーサイズ）、Mini-KVMシリーズ、およびuConsole KVM Extensionを含む超コンパクトなKVM-over-USBソリューション。',
  keywords:
    'KVM-over-USB, KVMスイッチ, ポータブルKVM, USB KVM, ヘッドレスサーバー管理, KVM-GO, Mini-KVM, KeyMod',
};
