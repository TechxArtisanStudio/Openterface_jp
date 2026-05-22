export const siteConfig = {
  name: 'Openterface',
  locale: 'ja',
  url: 'https://jp.openterface.com',
  legacyUrl: 'https://openterface.com',
  description:
    'ITプロフェッショナル向けの超コンパクトなKVM-over-USBソリューション — KVM-GO、Mini-KVM、KeyMod、およびuConsole KVM Extension。',
  ogImage: 'https://assets.openterface.com/images/cover/kvm-go-triple.webp',
  accent: '#ff6e42',
  links: {
    minikvmPurchase: 'https://www.crowdsupply.com/techxartisan/openterface-mini-kvm',
    kvmgoPurchase: 'https://www.crowdsupply.com/techxartisan/openterface-kvm-go',
    keymodCrowdsupply: 'https://www.crowdsupply.com/techxartisan/openterface-keymod',
    shop: 'https://shop.techxartisan.com/',
    appOverview: 'https://openterface.com/app/overview/',
    subscribe: 'https://subscribe.openterface.com/api/subscribe/',
  },
  analytics: {
    enabled: import.meta.env.PROD,
    google: {
      provider: 'google' as const,
      measurementId: 'G-EKZEH6QYWT',
      linkerDomains: [
        'openterface.com',
        'en.openterface.com',
        'de.openterface.com',
        'es.openterface.com',
        'fr.openterface.com',
        'it.openterface.com',
        'jp.openterface.com',
        'ko.openterface.com',
        'pt.openterface.com',
        'ro.openterface.com',
        'zh.openterface.com',
      ],
    },
    ahrefs: {
      dataKey: 'b3G5nUND8OglcZwfjfwixQ',
    },
    consent: {
      storageKey: 'openterface-cookie-consent',
      title: 'Cookie 同意',
      description:
        '当サイトでは、ドキュメントコンテンツの品質向上、サイトの効果分析のために Cookie を使用します。同意いただくことで、サイト改善にご協力いただけます。ありがとうございます！',
      acceptLabel: '同意する',
      rejectLabel: '拒否する',
      cookieLabel: 'Cookie',
    },
  },
} as const;

/** Build a legacy openterface.com URL for doc-heavy pages not yet migrated. */
export function legacyPath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.legacyUrl}${normalized}`;
}
