/** UI strings for /use-cases/ marketing stub page */

export type UseCasesStrings = {
  title: string;
  description: string;
  ogImageAlt: string;
  intro: string;
  items: string[];
};

const en: UseCasesStrings = {
  title: 'Use Cases',
  description: 'Real-world use cases for Openterface KVM-over-USB products.',
  ogImageAlt: 'Openterface Mini-KVM used for headless server and homelab management',
  intro:
    'Openterface tools shine whenever you need to control a headless or hard-to-reach computer without a dedicated monitor and keyboard.',
  items: [
    'Data center and colocation walk-throughs',
    'Homelab and NAS administration',
    'Embedded device and SBC bring-up',
    'Kiosk and digital signage maintenance',
    'Field IT and consulting engagements',
  ],
};

const translations: Record<string, UseCasesStrings> = {
  en,
  de: {
    title: 'Anwendungsfälle',
    description: 'Praxisnahe Anwendungsfälle für Openterface KVM-over-USB-Produkte.',
    ogImageAlt: 'Openterface Mini-KVM für Headless-Server- und Homelab-Verwaltung',
    intro:
      'Openterface-Tools überzeugen, wenn Sie einen headless oder schwer zugänglichen Computer ohne dedizierten Monitor und Tastatur steuern müssen.',
    items: [
      'Rechenzentrum- und Colocation-Begehungen',
      'Homelab- und NAS-Administration',
      'Embedded-Geräte und SBC-Inbetriebnahme',
      'Kiosk- und Digital-Signage-Wartung',
      'IT-Vor-Ort-Einsätze und Beratungsprojekte',
    ],
  },
  es: {
    title: 'Casos de Uso',
    description: 'Casos de uso reales de los productos Openterface KVM-over-USB.',
    ogImageAlt: 'Openterface Mini-KVM para gestión de servidores headless y homelab',
    intro:
      'Las herramientas Openterface destacan cuando necesita controlar un ordenador headless o de difícil acceso sin monitor y teclado dedicados.',
    items: [
      'Recorridos por centros de datos y colocation',
      'Administración de homelab y NAS',
      'Puesta en marcha de dispositivos embebidos y SBC',
      'Mantenimiento de quioscos y señalización digital',
      'IT de campo y proyectos de consultoría',
    ],
  },
  fr: {
    title: "Cas d'utilisation",
    description: "Cas d'utilisation concrets pour les produits Openterface KVM-over-USB.",
    ogImageAlt: 'Openterface Mini-KVM pour la gestion de serveurs headless et homelab',
    intro:
      'Les outils Openterface excellent lorsque vous devez contrôler un ordinateur headless ou difficile d\'accès sans écran et clavier dédiés.',
    items: [
      'Visites de centres de données et colocation',
      'Administration homelab et NAS',
      'Mise en service de dispositifs embarqués et SBC',
      'Maintenance de bornes et affichage numérique',
      'IT sur site et missions de conseil',
    ],
  },
  it: {
    title: "Casi d'Uso",
    description: 'Casi d\'uso reali per i prodotti Openterface KVM-over-USB.',
    ogImageAlt: 'Openterface Mini-KVM per la gestione di server headless e homelab',
    intro:
      'Gli strumenti Openterface sono ideali quando serve controllare un computer headless o difficile da raggiungere senza monitor e tastiera dedicati.',
    items: [
      'Ispezioni in data center e colocation',
      'Amministrazione homelab e NAS',
      'Avvio di dispositivi embedded e SBC',
      'Manutenzione chioschi e digital signage',
      'IT sul campo e consulenza',
    ],
  },
  ja: {
    title: '活用事例',
    description: 'Openterface KVM-over-USB製品の実際の活用事例。',
    ogImageAlt: 'ヘッドレスサーバーと homelab 管理用 Openterface Mini-KVM',
    intro:
      '専用モニターとキーボードなしで、headless またはアクセスしにくいコンピュータを操作する必要があるとき、Openterface ツールが活躍します。',
    items: [
      'データセンターおよびコロケーションの現地確認',
      'ホームラボおよび NAS の管理',
      '組み込みデバイスおよび SBC の立ち上げ',
      'キオスクおよびデジタルサイネージのメンテナンス',
      '現場 IT およびコンサルティング業務',
    ],
  },
  ko: {
    title: '활용 사례',
    description: 'Openterface KVM-over-USB 제품의 실제 활용 사례.',
    ogImageAlt: '헤드리스 서버 및 homelab 관리를 위한 Openterface Mini-KVM',
    intro:
      '전용 모니터와 키보드 없이 headless 또는 접근하기 어려운 컴퓨터를 제어해야 할 때 Openterface 도구가 빛을 발합니다.',
    items: [
      '데이터 센터 및 코로케이션 현장 점검',
      '홈랩 및 NAS 관리',
      '임베디드 장치 및 SBC 구동',
      '키오스크 및 디지털 사이니지 유지보수',
      '현장 IT 및 컨설팅 업무',
    ],
  },
  pt: {
    title: 'Casos de Uso',
    description: 'Casos de uso reais para produtos Openterface KVM-over-USB.',
    ogImageAlt: 'Openterface Mini-KVM para gestão de servidores headless e homelab',
    intro:
      'As ferramentas Openterface destacam-se sempre que precisa de controlar um computador headless ou de difícil acesso sem monitor e teclado dedicados.',
    items: [
      'Visitas a centros de dados e colocation',
      'Administração de homelab e NAS',
      'Arranque de dispositivos embebidos e SBC',
      'Manutenção de quiosques e sinalização digital',
      'IT de campo e projetos de consultoria',
    ],
  },
  ro: {
    title: 'Cazuri de utilizare',
    description: 'Cazuri de utilizare reale pentru produsele Openterface KVM-over-USB.',
    ogImageAlt: 'Openterface Mini-KVM pentru administrarea serverelor headless și homelab',
    intro:
      'Instrumentele Openterface excel atunci când trebuie să controlați un computer headless sau greu accesibil fără monitor și tastatură dedicate.',
    items: [
      'Inspecții în centre de date și colocation',
      'Administrare homelab și NAS',
      'Pornire dispozitive embedded și SBC',
      'Mentenanță chioșcuri și digital signage',
      'IT în teren și proiecte de consultanță',
    ],
  },
  zh: {
    title: '使用场景',
    description: 'Openterface KVM-over-USB 产品的真实使用场景。',
    ogImageAlt: '用于无头服务器与 homelab 管理的 Openterface Mini-KVM',
    intro:
      '当您需要在没有专用显示器和键盘的情况下控制无头或难以访问的计算机时，Openterface 工具最能发挥价值。',
    items: [
      '数据中心与托管机房现场巡检',
      'Homelab 与 NAS 管理',
      '嵌入式设备与 SBC 调试启动',
      '信息亭与数字标牌维护',
      '现场 IT 与咨询项目',
    ],
  },
  hk: {
    title: '使用場景',
    description: 'Openterface KVM-over-USB 產品的真實使用場景。',
    ogImageAlt: '用於無頭伺服器與 homelab 管理的 Openterface Mini-KVM',
    intro:
      '當您需要在沒有專用螢幕和鍵盤的情況下控制無頭或難以存取的電腦時，Openterface 工具最能發揮價值。',
    items: [
      '資料中心與託管機房現場巡檢',
      'Homelab 與 NAS 管理',
      '嵌入式裝置與 SBC 調試啟動',
      '資訊亭與數位看板維護',
      '現場 IT 與顧問專案',
    ],
  },
  tw: {
    title: '使用場景',
    description: 'Openterface KVM-over-USB 產品的真實使用場景。',
    ogImageAlt: '用於無頭伺服器與 homelab 管理的 Openterface Mini-KVM',
    intro:
      '當您需要在沒有專用螢幕和鍵盤的情況下控制無頭或難以存取的電腦時，Openterface 工具最能發揮價值。',
    items: [
      '資料中心與託管機房現場巡檢',
      'Homelab 與 NAS 管理',
      '嵌入式裝置與 SBC 調試啟動',
      '資訊亭與數位看板維護',
      '現場 IT 與顧問專案',
    ],
  },
  ru: {
    title: 'Сценарии',
    description: 'Реальные сценарии использования продуктов Openterface KVM-over-USB.',
    ogImageAlt: 'Openterface Mini-KVM для управления headless-серверами и homelab',
    intro:
      'Инструменты Openterface незаменимы, когда нужно управлять headless-компьютером или труднодоступной системой без отдельного монитора и клавиатуры.',
    items: [
      'Обходы дата-центров и colocation',
      'Администрирование homelab и NAS',
      'Запуск встроенных устройств и SBC',
      'Обслуживание киосков и цифровых вывесок',
      'Полевая IT-поддержка и консалтинг',
    ],
  },
  ar: {
    title: 'حالات الاستخدام',
    description: 'حالات استخدام حقيقية لمنتجات Openterface KVM-over-USB.',
    ogImageAlt: 'Openterface Mini-KVM لإدارة خوادم headless و homelab',
    intro:
      'تتألق أدوات Openterface عندما تحتاج إلى التحكم في جهاز headless أو صعب الوصول دون شاشة ولوحة مفاتيح مخصصة.',
    items: [
      'جولات في مراكز البيانات والاستضافة المشتركة',
      'إدارة homelab و NAS',
      'تشغيل الأجهزة المدمجة و SBC',
      'صيانة الأكشاك واللافتات الرقمية',
      'IT ميداني ومشاريع استشارية',
    ],
  },
  tr: {
    title: 'Kullanım senaryoları',
    description: 'Openterface KVM-over-USB ürünleri için gerçek dünya kullanım senaryoları.',
    ogImageAlt: 'Headless sunucu ve homelab yönetimi için Openterface Mini-KVM',
    intro:
      'Openterface araçları, özel monitör ve klavye olmadan headless veya erişimi zor bir bilgisayarı kontrol etmeniz gerektiğinde öne çıkar.',
    items: [
      'Veri merkezi ve colocation gezintileri',
      'Homelab ve NAS yönetimi',
      'Gömülü cihaz ve SBC devreye alma',
      'Kiosk ve dijital tabela bakımı',
      'Saha IT ve danışmanlık projeleri',
    ],
  },
  pl: {
    title: 'Zastosowania',
    description: 'Rzeczywiste zastosowania produktów Openterface KVM-over-USB.',
    ogImageAlt: 'Openterface Mini-KVM do zarządzania serwerami headless i homelab',
    intro:
      'Narzędzia Openterface sprawdzają się, gdy trzeba kontrolować komputer headless lub trudno dostępny bez dedykowanego monitora i klawiatury.',
    items: [
      'Obchody centrów danych i colocation',
      'Administracja homelab i NAS',
      'Uruchamianie urządzeń embedded i SBC',
      'Konserwacja kiosków i digital signage',
      'IT w terenie i projekty konsultingowe',
    ],
  },
  nl: {
    title: 'Use cases',
    description: 'Praktische use cases voor Openterface KVM-over-USB-producten.',
    ogImageAlt: 'Openterface Mini-KVM voor headless server- en homelab-beheer',
    intro:
      'Openterface-tools blinken uit wanneer u een headless of moeilijk bereikbare computer wilt bedienen zonder apart beeldscherm en toetsenbord.',
    items: [
      'Rondes in datacenters en colocation',
      'Homelab- en NAS-beheer',
      'Embedded devices en SBC-opstart',
      'Onderhoud van kiosken en digital signage',
      'IT in het veld en adviesopdrachten',
    ],
  },
};

export function getUseCasesStrings(locale: string): UseCasesStrings {
  return translations[locale] ?? en;
}
