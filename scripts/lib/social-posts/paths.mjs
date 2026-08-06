import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
/** Marketing repo root when this file lives at scripts/lib/social-posts/paths.mjs */
const MARKETING_ROOT_DEFAULT = resolve(__dirname, '../../..');

function resolveMarketingName(marketingRoot) {
  try {
    const pkg = JSON.parse(readFileSync(join(marketingRoot, 'package.json'), 'utf8'));
    if (pkg.name) return pkg.name;
  } catch {
    /* ignore */
  }
  return basename(marketingRoot);
}

/**
 * Resolve social-posts paths from a marketing repo (CI-safe).
 * Looks for sibling Openterface_assets; falls back to CDN-only when absent.
 */
export function getSocialPostsPaths(options = {}) {
  const marketingRoot = options.marketingRoot
    ? resolve(options.marketingRoot)
    : MARKETING_ROOT_DEFAULT;
  const marketingRepo = options.marketingRepo ?? resolveMarketingName(marketingRoot);

  const assetsCandidates = [
    join(marketingRoot, '../../Openterface_assets'),
    join(marketingRoot, '../../../Openterface_assets'),
    join(marketingRoot, '../Openterface_assets'),
  ];
  const assetsRoot =
    assetsCandidates.find((c) => existsSync(join(c, 'src/data/social-posts.csv'))) ??
    assetsCandidates[0];

  const workspaceRoot = resolve(assetsRoot, '..');

  return {
    workspaceRoot,
    assetsRoot,
    marketingRoot,
    marketingRepo,
    assetsAvailable: existsSync(join(assetsRoot, 'src/data/social-posts.csv')),
    csvPath: join(assetsRoot, 'src/data/social-posts.csv'),
    thumbsDir: join(assetsRoot, 'src/images/social-posts'),
    avatarsDir: join(assetsRoot, 'src/images/social-posts/avatars'),
    marketingAvatarsPublicDir: join(marketingRoot, 'public/images/social-posts/avatars'),
    generatedTsPath: join(marketingRoot, 'src/data/socialPosts.generated.ts'),
    csvCdnUrl: 'https://assets.openterface.com/data/social-posts.csv',
    thumbCdnBase: 'https://assets.openterface.com/images/social-posts',
    avatarCdnBase: 'https://assets.openterface.com/images/social-posts/avatars',
  };
}
