export interface MarketingUi {
  docLinkBanner: {
    aboutMessage: string;
    homeMessage: string;
    productMessage: string;
    linkLabel: string;
  };
  homeSubscribe: {
    kicker: string;
    heading: string;
    description: string;
    benefitCrowdfunding: string;
    benefitGuides: string;
    benefitUnsubscribe: string;
    submitLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    footnote: string;
  };
  siteFooter: {
    tagline: string;
    productsHeading: string;
    keymodSeries: string;
    kvmGoSeries: string;
    miniKvm: string;
    accessories: string;
    resourcesHeading: string;
    videos: string;
    faqs: string;
    apps: string;
    support: string;
    newsletterTitle: string;
    newsletterDescription: string;
    newsletterSubmit: string;
    newsletterNamePlaceholder: string;
    newsletterEmailPlaceholder: string;
    newsletterFootnote: string;
    copyright: string;
    privacy: string;
    terms: string;
  };
  productLanding: {
    downloadApp: string;
    backers: string;
    theProblem: string;
    theSolution: string;
    hwSoftwareTitle: string;
    hwSoftwareSubtitle: string;
    hardware: string;
    software: string;
    swFallback: string;
    keySpecs: string;
    useCases: string;
    documentation: string;
    ctaTitle: string;
    ctaSubtitle: string;
  };
}

export const ui: MarketingUi = {
  "docLinkBanner": {
    "aboutMessage": "製品ガイド、FAQ、チュートリアル、アプリのダウンロードは docs.openterface.com にあります。",
    "homeMessage": "チュートリアル、FAQ、アプリのダウンロード、製品ガイドは docs.openterface.com にあります。",
    "linkLabel": "ドキュメントを開く ↗",
    "productMessage": "詳細スペック、セットアップガイド、FAQ は docs.openterface.com にあります。"
  },
  "homeSubscribe": {
    "kicker": "最新情報をキャッチ",
    "heading": "KVM-GO、KeyMod、Mini-KVM の更新をいち早く",
    "description": "製品ローンチ、ファームウェア、実践的な IT ヒント — 月に最大 1 回。スパムなし、Openterface チームからの有用なニュースだけ。",
    "benefitCrowdfunding": "クラウドファンディングと予約販売への早期アクセス",
    "benefitGuides": "セットアップガイドとアプリリリースノート",
    "benefitUnsubscribe": "ワンクリックでいつでも配信解除",
    "submitLabel": "更新情報を購読",
    "namePlaceholder": "お名前（任意）",
    "emailPlaceholder": "メールアドレス *",
    "footnote": "月に最大 1 通。いつでも配信解除可能。お問い合わせ：info@openterface.com"
  },
  "siteFooter": {
    "tagline": "ITプロフェッショナル向けの超コンパクトなKVM-over-USBソリューション。",
    "productsHeading": "製品",
    "keymodSeries": "KeyMod シリーズ",
    "kvmGoSeries": "KVM-GO シリーズ",
    "miniKvm": "Mini-KVM",
    "accessories": "アクセサリー",
    "resourcesHeading": "リソース",
    "videos": "ビデオ",
    "faqs": "FAQ",
    "apps": "アプリ",
    "support": "サポート",
    "newsletterTitle": "ニュースレター",
    "newsletterDescription": "製品、ファームウェア、KVM のヒントに関する月次アップデート。",
    "newsletterSubmit": "登録",
    "newsletterNamePlaceholder": "お名前",
    "newsletterEmailPlaceholder": "メール *",
    "newsletterFootnote": "いつでも配信解除できます。",
    "copyright": "Openterface. オープンソース KVM-over-USB。",
    "privacy": "プライバシーポリシー",
    "terms": "利用規約"
  },
  "productLanding": {
    "downloadApp": "アプリをダウンロード",
    "backers": "バッカー",
    "theProblem": "課題",
    "theSolution": "解決策",
    "hwSoftwareTitle": "ハードウェア + ソフトウェア",
    "hwSoftwareSubtitle": "Openterface 製品はオープンソースのホストアプリと組み合わせると最も効果的です。",
    "hardware": "ハードウェア",
    "software": "ソフトウェア",
    "swFallback": "アクセサリの互換性の詳細は TxA Shop をご覧ください。",
    "keySpecs": "主要スペック",
    "useCases": "ユースケース",
    "documentation": "ドキュメント",
    "ctaTitle": "始める準備はできましたか？",
    "ctaSubtitle": "ハードウェアを注文し、お使いのプラットフォーム向け Openterface アプリをダウンロード。"
  }
};
