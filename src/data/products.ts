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
    title: 'Openterface KeyMod Series',
    slogan: 'Turn Your Phone into a Smart Keyboard',
    subtitle: 'Programmable keyboard and mouse control for tech, professionals, and gaming.',
    description:
      'A compact, programmable USB + Bluetooth HID emulator that turns your phone into a portable keyboard and trackpad console. Built on the proven HID core from Openterface Mini-KVM — plug and play, 100% open source.',
    seoDescription:
      'KeyMod Series turns your phone into a portable keyboard and trackpad. USB + Bluetooth HID emulator, open source, perfect for kiosks and workflow shortcuts.',
    keywords: 'KeyMod, HID emulator, phone keyboard, Bluetooth keyboard, USB keyboard, open source',
    heroImage: 'https://assets2.openterface.com/images/keymod/2in1.webp',
    heroImages: [
      'https://assets2.openterface.com/images/keymod/2in1.webp',
      'https://assets2.openterface.com/images/keymod/keymod.webp',
      'https://assets2.openterface.com/images/keymod/feature.webp',
    ],
    buyLabel: 'Support NOW',
    buyHref: siteConfig.links.keymodCrowdsupply,
    painPoints: [
      'Carrying a full keyboard for kiosk or TV setup is impractical',
      'Workflow shortcuts need programmable macros on the go',
      'Many HID tools are closed-source with limited customization',
    ],
    solutions: [
      'Use your phone as a portable keyboard and trackpad',
      'USB and Bluetooth HID in one compact device',
      '100% open source with Openterface app support',
    ],
    hwFeatures: [
      { title: 'Compact form factor', description: 'Fits in your pocket for field work and travel.' },
      { title: 'USB + Bluetooth', description: 'Dual connectivity for maximum device compatibility.' },
      { title: 'Open hardware', description: 'Transparent design built on proven Openterface HID core.' },
    ],
    swFeatures: [
      { title: 'KeyMod App', description: 'Configure macros, layouts, and gamepad profiles from your phone.' },
      { title: 'Cross-platform', description: 'Works with Android, iPadOS, and desktop hosts via Openterface apps.' },
      { title: 'Open source', description: 'Full stack available on GitHub for community contributions.' },
    ],
    specs: [
      { label: 'Connectivity', value: 'USB-C + Bluetooth LE' },
      { label: 'HID modes', value: 'Keyboard, mouse, gamepad' },
      { label: 'License', value: 'Open source hardware & software' },
    ],
    useCases: ['Smart TV & kiosk input', 'Mobile workflow macros', 'Gaming & accessibility setups'],
    docLinks: [
      { label: 'Features', href: legacyPath('/product/keymod/features/') },
      { label: "What's in the Box", href: legacyPath('/product/keymod/whats-in-the-box/') },
      { label: 'How to Connect', href: legacyPath('/product/keymod/how-to-connect/') },
      { label: 'FAQs', href: legacyPath('/product/keymod/faq/') },
      { label: 'Download KeyMod App', href: legacyPath('/app/overview/') },
    ],
    legacyBase: '/product/keymod/',
  },
  'kvm-go': {
    slug: 'kvm-go',
    title: 'Openterface KVM-GO Series',
    slogan: 'Ultra-Compact KVM That Fits on Your Keychain',
    subtitle: 'For Critical Tech Moments — Plug. Control. Go.',
    description:
      'The next-generation KVM-over-USB solution with built-in video connectors (HDMI, DisplayPort, or VGA). Ultra-compact, keychain-sized, and built for rapid IT operations in data centers and server rooms.',
    seoDescription:
      'Control headless computers with Openterface KVM-Go. Built-in HDMI/DP/VGA, keychain-sized, 4K KVM-over-USB for IT professionals.',
    keywords: 'KVM-Go, KVM over USB, ultra-compact KVM, keychain KVM, 4K KVM, headless control',
    heroImage: 'https://assets.openterface.com/images/cover/kvm-go-triple.webp',
    heroImages: [
      'https://assets.openterface.com/images/cover/kvm-go-triple.webp',
      'https://assets.openterface.com/images/cover/kvm-go-triple-2.webp',
    ],
    buyLabel: 'Pre-Order NOW',
    buyHref: siteConfig.links.kvmgoPurchase,
    funding: { amount: '$101,548', date: 'Funded on Dec 30, 2025', backers: '478' },
    painPoints: [
      'Traditional KVM gear is bulky and requires separate video cables',
      'Emergency server access in the field needs a pocket-sized tool',
      'Headless troubleshooting without network access is slow',
    ],
    solutions: [
      'Built-in video connectors eliminate extra cables',
      'Keychain form factor always within reach',
      'KVM-over-USB — no network or drivers required on target',
    ],
    hwFeatures: [
      { title: 'Built-in video', description: 'HDMI, DisplayPort, or VGA models — no loose cables.' },
      { title: 'Keychain size', description: 'Smallest KVM-over-USB in the Openterface lineup.' },
      { title: '4K support', description: 'High-resolution capture for modern displays.' },
    ],
    swFeatures: [
      { title: 'Openterface Qt App', description: 'Cross-platform host control for Windows, macOS, and Linux.' },
      { title: 'MicroSD switch', description: 'Switchable storage for portable OS images and tools.' },
      { title: 'Open source stack', description: 'Community-driven firmware and host applications.' },
    ],
    specs: [
      { label: 'Video', value: 'HDMI / DP / VGA (model dependent)' },
      { label: 'Resolution', value: 'Up to 4K' },
      { label: 'Connection', value: 'USB-C KVM-over-USB' },
    ],
    useCases: ['Data center walk-throughs', 'Headless device setup', 'Field IT and homelab rescue'],
    docLinks: [
      { label: 'Features', href: legacyPath('/product/kvm-go/features/') },
      { label: 'Beta Quick Start', href: legacyPath('/product/kvm-go/beta-quick-start/') },
      { label: 'How to Connect', href: legacyPath('/product/kvm-go/how-to-connect/') },
      { label: 'FAQs', href: legacyPath('/product/kvm-go/faq/') },
      { label: 'Download App', href: legacyPath('/app/overview/') },
    ],
    legacyBase: '/product/kvm-go/',
  },
  minikvm: {
    slug: 'minikvm',
    title: 'Openterface Mini-KVM',
    slogan: 'Turn Your Laptop into a KVM Console',
    subtitle: 'Simplify Your Tech Life.',
    description:
      'A plug-and-play KVM-over-USB solution. Control a nearby headless computer from your laptop using USB and HDMI — no extra peripherals or network required.',
    seoDescription:
      'Openterface Mini-KVM: plug-and-play KVM-over-USB with HDMI. Control headless computers from your laptop without network.',
    keywords: 'Mini-KVM, KVM over USB, headless control, HDMI KVM, plug and play KVM',
    heroImage: 'https://assets.openterface.com/images/cover/mini-kvm-toolkit.webp',
    heroImages: [
      'https://assets.openterface.com/images/cover/mini-kvm-toolkit.webp',
      'https://assets.openterface.com/images/cover/mini-kvm.webp',
    ],
    buyLabel: 'Order NOW',
    buyHref: siteConfig.links.minikvmPurchase,
    funding: { amount: '$505,471', date: 'Funded on Jun 13, 2024', backers: '3,775' },
    painPoints: [
      'Lugging a monitor and keyboard for every server fix is impractical',
      'Network KVM requires configuration and connectivity',
      'IT professionals need a reliable pocket KVM daily',
    ],
    solutions: [
      'Use your existing laptop as the KVM console',
      'HDMI capture + USB HID in one compact device',
      'Proven by 5,000+ community members since 2024',
    ],
    hwFeatures: [
      { title: 'HDMI capture', description: 'Full video from target machine to your host laptop.' },
      { title: 'USB switch', description: 'Toggle USB devices between host and target.' },
      { title: 'Extension pins', description: 'Hardware hacking and custom integration options.' },
    ],
    swFeatures: [
      { title: 'Qt / macOS / Android apps', description: 'Native apps for every major host platform.' },
      { title: 'Open source', description: 'Fully open hardware and software ecosystem.' },
      { title: 'Active community', description: 'Discord, GitHub, and regular firmware updates.' },
    ],
    specs: [
      { label: 'Video input', value: 'HDMI' },
      { label: 'USB', value: 'USB-C with switchable port' },
      { label: 'Status', value: 'Shipping — Crowd Supply' },
    ],
    useCases: ['Homelab management', 'Developer workstation side-by-side control', 'IT bench troubleshooting'],
    docLinks: [
      { label: 'Features', href: legacyPath('/product/minikvm/features/') },
      { label: 'USB Switch', href: legacyPath('/product/minikvm/usb-switch/') },
      { label: 'Tech Support', href: legacyPath('/product/minikvm/support/') },
      { label: 'FAQs', href: legacyPath('/product/minikvm/faq/') },
      { label: 'Download App', href: legacyPath('/app/overview/') },
    ],
    legacyBase: '/product/minikvm/',
  },
  'uconsole-kvm-extension': {
    slug: 'uconsole-kvm-extension',
    title: 'uConsole KVM Extension',
    slogan: 'KVM Power for Your uConsole',
    subtitle: 'Turn the portable uConsole into a full KVM terminal.',
    description:
      'A hardware extension that adds KVM-over-USB capability to the Clockwork uConsole. Perfect for portable IT work with a built-in keyboard and display.',
    seoDescription:
      'uConsole KVM Extension adds KVM-over-USB to the Clockwork uConsole portable computer.',
    keywords: 'uConsole, KVM extension, portable KVM, Clockwork uConsole',
    heroImage: 'https://assets.openterface.com/images/uconsole-kvm-extension/uconsole-kvm-extension-1.webp',
    heroImages: [
      'https://assets.openterface.com/images/uconsole-kvm-extension/uconsole-kvm-extension-1.webp',
    ],
    buyLabel: 'Learn More',
    buyHref: legacyPath('/product/uconsole-kvm-extension/'),
    painPoints: [
      'Portable consoles lack integrated KVM for headless targets',
      'Field technicians want one device for everything',
    ],
    solutions: [
      'Native uConsole form-factor extension board',
      'Full Openterface KVM stack on a pocketable device',
    ],
    hwFeatures: [
      { title: 'uConsole native', description: 'Designed specifically for Clockwork uConsole.' },
      { title: 'Compact PCB', description: 'Installs inside the uConsole chassis.' },
    ],
    swFeatures: [
      { title: 'Openterface apps', description: 'Same trusted software as Mini-KVM and KVM-GO.' },
      { title: 'Setup guides', description: 'Step-by-step hardware and software installation docs.' },
    ],
    specs: [
      { label: 'Compatibility', value: 'Clockwork uConsole' },
      { label: 'Certification', value: 'OSHWA certified' },
    ],
    useCases: ['Portable datacenter tool', 'Maker & homelab on the go'],
    docLinks: [
      { label: 'Hardware Installation', href: legacyPath('/product/uconsole-kvm-extension/hardware-installation/') },
      { label: 'Software Setup', href: legacyPath('/product/uconsole-kvm-extension/software-setup/') },
      { label: 'How to Connect', href: legacyPath('/product/uconsole-kvm-extension/connect-to-target/') },
      { label: 'FAQs', href: legacyPath('/product/uconsole-kvm-extension/faq/') },
    ],
    legacyBase: '/product/uconsole-kvm-extension/',
  },
  accessories: {
    slug: 'accessories',
    title: 'Openterface Accessories',
    slogan: 'Complete Your Setup',
    subtitle: 'Premium cables, adapters, and toolkit bags for professionals.',
    description:
      'Essential accessories including video adapters, high-speed cables, and storage solutions. Enhance your Openterface experience with quality gear from TxA Shop.',
    seoDescription: 'Openterface accessories — cables, adapters, toolkit bags, and video connectors.',
    keywords: 'KVM accessories, HDMI cable, USB-C cable, toolkit bag',
    heroImage: 'https://assets.openterface.com/images/cover.webp',
    heroImages: ['https://assets.openterface.com/images/cover.webp'],
    buyLabel: 'Shop NOW',
    buyHref: siteConfig.links.shop,
    painPoints: ['Missing the right cable in the field delays every fix'],
    solutions: ['Curated accessories tested with Openterface products'],
    hwFeatures: [
      { title: 'Video adapters', description: 'HDMI, VGA, and specialty connectors.' },
      { title: 'High-speed cables', description: 'USB-C and Type-A cables built for KVM workloads.' },
      { title: 'Toolkit bag', description: 'Organize your full Openterface kit.' },
    ],
    swFeatures: [],
    specs: [],
    useCases: ['Field kit organization', 'Video format conversion', 'Backup cables for IT go-bags'],
    docLinks: [
      { label: 'All SKUs', href: legacyPath('/product/accessories/') },
      { label: 'TxA Shop', href: siteConfig.links.shop },
    ],
    legacyBase: '/product/accessories/',
  },
};

export const productSlugs = Object.keys(products);
