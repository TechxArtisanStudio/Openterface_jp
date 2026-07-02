import { docsPath, siteConfig } from '../../config/site';
import type { Product } from '../products';

/**
 * Mini-KVM marketing payload — reference template for Phase 1D–1G.
 * Sourced from docs/products/minikvm/ (index, features, reviews).
 */
export const minikvmProduct: Product = {
  slug: 'minikvm',
  title: 'Openterface Mini-KVM',
  slogan: 'Turn Your Laptop into a KVM Console',
  subtitle: 'Simplify Your Tech Life.',
  status: 'shipping',
  description:
    'Our Openterface Mini-KVM is a plug-and-play KVM-over-USB solution. Control a nearby headless computer directly from your laptop using USB and HDMI — no extra peripherals or network connectivity required.',
  seoDescription:
    'Control headless computers from your laptop with Openterface Mini-KVM. Plug-and-play KVM-over-USB with HDMI, BIOS-level access, 4K capture, and open-source host apps.',
  keywords:
    'Mini-KVM, KVM over USB, headless control, HDMI KVM, plug and play KVM, BIOS access, crash cart, open source KVM',
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
    {
      title: 'BIOS-level access',
      description: 'Reach firmware, boot menus, and startup screens without network dependencies.',
    },
    {
      title: '4K HDMI capture',
      description: 'Up to 3840×2160 @ 30Hz input with full HD output and under 140ms latency.',
    },
    {
      title: 'Switchable USB port',
      description: 'Share USB drives between host and target — ideal for OS installs and recovery.',
    },
  ],
  swFeatures: [
    {
      title: 'Cross-platform apps',
      description: 'Native host apps for macOS, Windows, Linux, and Android.',
    },
    {
      title: 'Text transfer',
      description: 'Send usernames, passwords, and code snippets via simulated keystrokes (ASCII).',
    },
    {
      title: 'Open source',
      description: 'Fully open hardware and software — transparent, community-driven stack.',
    },
  ],
  specs: [
    { label: 'Video input', value: 'Up to 4K @ 30Hz (HDMI)' },
    { label: 'Video output', value: '1080p @ 30Hz, <140ms latency' },
    { label: 'Dimensions', value: '61 × 53 × 13.5 mm (~48g)' },
    { label: 'Power', value: 'USB-C (no external supply)' },
    { label: 'Host apps', value: 'macOS, Windows, Linux, Android' },
    { label: 'Target device', value: 'Plug-and-play — no software install' },
  ],
  useCases: [
    'Data center crash-cart replacement',
    'Homelab & SBC setup',
    'BIOS and firmware troubleshooting',
    'Developer bench side-by-side control',
    'Kiosk and embedded configuration',
    'MSP field toolkit',
  ],
  useCaseCards: [
    {
      title: 'Data center & server rooms',
      description: 'Replace rolling crash carts with the laptop you already carry.',
      href: docsPath('/products/minikvm/reviews/'),
    },
    {
      title: 'Homelab & SBC setup',
      description: 'Configure headless Raspberry Pi, NAS, and lab nodes from one laptop.',
    },
    {
      title: 'BIOS & firmware access',
      description: 'Reach boot menus and recovery screens with no network KVM required.',
      href: docsPath('/products/minikvm/features/'),
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
      href: docsPath('/products/minikvm/reviews/'),
    },
  ],
  useCasesDocsHref: docsPath('/products/minikvm/'),
  specsDocsHref: docsPath('/products/minikvm/features/'),
  docsOverviewHref: docsPath('/products/minikvm/'),
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
    { label: 'Features', href: docsPath('/products/minikvm/features/') },
    { label: 'How to Connect', href: docsPath('/products/minikvm/how-to-connect/') },
    { label: 'USB Switch', href: docsPath('/products/minikvm/usb-switch/') },
    { label: 'Reviews & Media', href: docsPath('/products/minikvm/reviews/') },
    { label: 'FAQs', href: docsPath('/products/minikvm/faq/') },
    { label: 'Download App', href: docsPath('/app/kvm/') },
  ],
  legacyBase: '/products/minikvm/',
};
