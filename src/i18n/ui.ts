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
  }
};
