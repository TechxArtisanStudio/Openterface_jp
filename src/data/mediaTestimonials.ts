import type { MediaPostEntry } from '../lib/youtube';

/**
 * Quote testimonials — migrated from legacy reviews index.
 * Skips Cameron Gray & apalrd (already in YouTube catalog as video cards).
 */
export const mediaTestimonials: MediaPostEntry[] = [
  {
    id: 'testimonial-florian-bernd',
    format: 'testimonial',
    title: 'Extremely useful tool',
    excerpt:
      'All in all, the Openterface KVM is an extremely useful tool that I will certainly be using a lot in the future. The hardware is more than solid and the toolbox also contains all the accessories you need.',
    author: 'Florian Bernd',
    platform: 'blog',
    externalUrl: 'https://blog.flobernd.de/2024/06/openterface-beta-test/',
    thumbnail: 'https://blog.flobernd.de/2024/06/openterface-beta-test/thumbnail.jpg',
    date: '2024-06-01',
    product: 'minikvm',
    language: 'de',
  },
  {
    id: 'testimonial-vincent-cox',
    format: 'testimonial',
    title: 'Opensource <3',
    excerpt:
      'Klein formaat maakt het makkelijk om mee te nemen tijdens field-work. Je kan onmiddellijk met een headless device verbinden, geen gedoe met extra monitor en keyboard. Best of all: Opensource <3',
    author: 'Vincent Cox',
    date: '2024-06-01',
    product: 'minikvm',
    language: 'nl',
  },
  {
    id: 'testimonial-vegard-hagen',
    format: 'testimonial',
    title: 'Fantastisk liten dings',
    excerpt:
      'Fantastisk liten dings som gjør oppsett og vedlikehold av hjemmelabben så mye enklere!',
    author: 'Vegard Hagen',
    date: '2024-06-01',
    product: 'minikvm',
    language: 'no',
  },
  {
    id: 'testimonial-nkahoang',
    format: 'testimonial',
    title: 'CrowdStrike recovery',
    excerpt:
      'This makes recovery from the CrowdStrike incident much less painful. Highly recommended!',
    author: 'nkahoang',
    date: '2024-07-01',
    product: 'minikvm',
    language: 'en',
  },
  {
    id: 'testimonial-jordan-jones',
    format: 'testimonial',
    title: 'All-in-one box for interfacing',
    excerpt:
      "Openterface provides an all-in-one box for interfacing with pretty much any device using hdmi and usb. It's small kit has become extremely handy where ever I need it.",
    author: 'Jordan Jones',
    platform: 'github',
    externalUrl: 'https://github.com/kashalls',
    channelAvatar: 'https://avatars.githubusercontent.com/u/426067?v=4',
    date: '2024-06-01',
    product: 'minikvm',
    language: 'en',
  },
  {
    id: 'testimonial-ctjameson',
    format: 'testimonial',
    title: 'The most amazing thing ever',
    excerpt:
      "So tiny! So this thing is honestly the most amazing thing ever for so many use cases. Even just as a keyboard! But the video/capture is so good I'll be using it for all testing/setup of any device ever again.",
    author: 'ctjameson',
    date: '2024-06-01',
    product: 'minikvm',
    language: 'en',
  },
  {
    id: 'testimonial-billy-kan',
    format: 'testimonial',
    title: 'Crisp graphics and sounds',
    excerpt:
      "The package is beautiful and I can control the MacMini on my Macbook Pro in 5 minutes by just plugging in a couple of HDMI and USB-C cables, with crisp graphics and sounds (I am enjoying 70's oldies now as I type this).",
    author: 'Billy Kan',
    platform: 'linkedin',
    externalUrl:
      'https://www.linkedin.com/posts/billykan_so-happy-to-get-my-old-headless-macmini-back-activity-7251885312509902848-EHpb',
    thumbnail:
      'https://media.licdn.com/dms/image/v2/D4E22AQHad6QFkGiYmg/feedshare-image-high-res/feedshare-image-high-res/0/1728984186945?e=2147483647&v=beta&t=P3YYHuQl7Ti-ML1HSB9NKur4CkdSUF8dVF0ztQOGoPU',
    date: '2024-10-01',
    product: 'minikvm',
    language: 'en',
  },
  {
    id: 'testimonial-samw-tinytoolk',
    format: 'testimonial',
    title: 'Replaces the crash cart',
    excerpt:
      "In datacenters, where you typically see a monitor, mouse, and keyboard on wheels (a 'crash cart'), it's cool that this device totally replaces that using the laptop you'd already have with you!",
    author: 'samw',
    platform: 'blog',
    externalUrl: 'https://tinytoolk.it/tools/openterface-kvm/',
    thumbnail: 'https://assets.openterface.com/images/cover/mini-kvm-toolkit.webp',
    date: '2024-08-01',
    product: 'minikvm',
    language: 'en',
  },
  {
    id: 'testimonial-mnmsp-reddit',
    format: 'testimonial',
    title: 'Quick and snappy to use',
    excerpt:
      "Haven't used it a ton yet and I'm not going to use it as a daily driver but it's great for quickly jumping on a system without hauling around another monitor. It's quick and snappy to use and just works. The software is straight forward and serviceable and snappy. No complaints at all.",
    author: 'MNMsp',
    platform: 'reddit',
    externalUrl:
      'https://www.reddit.com/r/msp/comments/1j2dlde/comment/mfrt6gk/',
    date: '2025-01-01',
    product: 'minikvm',
    language: 'en',
  },
  {
    id: 'testimonial-65diamond-reddit',
    format: 'testimonial',
    title: 'Absolutely love it',
    excerpt:
      '...Absolutely love it. Latency is definitely better than using VNC, though still in the same ballpark. The only display input on it is HDMI, but any standard to-male hdmi adapters will work. Overall a very solid device, it has been a very worthy addition to my daily carry toolkit.',
    author: '65Diamond',
    platform: 'reddit',
    externalUrl:
      'https://www.reddit.com/r/msp/comments/1j2dlde/comment/mju6uru/',
    date: '2025-01-01',
    product: 'minikvm',
    language: 'en',
  },
  {
    id: 'testimonial-matsuu-x',
    format: 'testimonial',
    title: 'USB+HDMI KVM console',
    excerpt:
      'ノートパソコンに繋げるタイプのKVMコソール。似たような製品でUSB+VGAはあるがこれはUSB+HDMI構成。オープンソース実装になっているそうで安価になるっぽい。いいねこれ。',
    author: 'matsuu',
    platform: 'x',
    externalUrl: 'https://x.com/matsuu/status/1789322019315892318',
    date: '2024-05-01',
    product: 'minikvm',
    language: 'ja',
  },
  {
    id: 'testimonial-kazubu-x',
    format: 'testimonial',
    title: '迅速に対応することができました',
    excerpt:
      'この安価でコンパクトなMini-KVMを持ち運ぶことによって、急にサーバやミニPCを操作する必要がある際に迅速に対応することができました。',
    author: 'Kazubu',
    platform: 'x',
    externalUrl: 'https://x.com/_kazubu/status/1828454779875701044',
    thumbnail: 'https://pbs.twimg.com/media/GV_57gxWkAACcix?format=jpg&name=medium',
    date: '2024-08-01',
    product: 'minikvm',
    language: 'ja',
  },
  {
    id: 'testimonial-yukito-kato-itmedia',
    format: 'testimonial',
    title: '非常にコンパクトで持ち運びも楽ちん',
    excerpt:
      'Mini-KVMは小さな本体とケーブル3本で構成されており、一般的なKVMスイッチと比較すると、非常にコンパクトで持ち運びも楽ちんだ。データセンターでのトラブル対応時にも便利に利用可能と思います。',
    author: 'Yukito KATO, ITmedia',
    platform: 'blog',
    externalUrl: 'https://www.itmedia.co.jp/pcuser/articles/2503/13/news174.html',
    thumbnail: 'https://image.itmedia.co.jp/pcuser/articles/2503/13/cover_news174.jpg',
    date: '2025-03-13',
    product: 'minikvm',
    language: 'ja',
  },
  {
    id: 'testimonial-tsunokawa-blog',
    format: 'testimonial',
    title: 'ものすごく使い勝手が良い',
    excerpt:
      '本体も小型で配線も少なく、すぐに使い始められるためものすごく使い勝手が良いと感じました。データセンターでのトラブル対応時にも便利に利用可能と思います。Mini-KVMを使えばノートPCさえあれば、最小限のケーブルだけで作業できるためとても作業しやすいと思います。',
    author: 'tsunokawa',
    platform: 'blog',
    externalUrl: 'https://tsunokawa.hatenablog.com/entry/2025/02/26/060000',
    thumbnail:
      'https://cdn-ak.f.st-hatena.com/images/fotolife/t/tsunokawa/20250224/20250224144958.jpg',
    date: '2025-02-26',
    product: 'minikvm',
    language: 'ja',
  },
  {
    id: 'testimonial-tinyrack-blog',
    format: 'testimonial',
    title: '제대로 된 소프트웨어를 제공한다',
    excerpt:
      'Openterface 의 경우 제 테스트 상황에서는 모두 잘 동작했어요. 그래서 적어도 윈도우에서 만큼은 확실히 제대로 된 소프트웨어를 제공한다고 생각해요.',
    author: 'tinyrack',
    platform: 'blog',
    externalUrl: 'https://tinyrack.net/openterface-mini-kvm/',
    thumbnail: 'https://tinyrack.net/_astro/1013207.nBa2sTrG.JPG',
    date: '2025-01-01',
    product: 'minikvm',
    language: 'ko',
  },
];
