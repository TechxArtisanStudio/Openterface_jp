import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, extname } from 'node:path';
import { curlDownloadFile, hasProxyEnv } from './curl-fetch.mjs';

const UA =
  'Mozilla/5.0 (compatible; OpenterfaceSocialSync/1.0; +https://openterface.com)';

function extFromContentType(type) {
  if (!type) return '.webp';
  if (type.includes('jpeg') || type.includes('jpg')) return '.jpg';
  if (type.includes('png')) return '.png';
  if (type.includes('webp')) return '.webp';
  return '.webp';
}

export async function downloadThumbnail(sourceUrl, destPathBase) {
  const ext = extname(new URL(sourceUrl).pathname) || '.jpg';
  const destPath = `${destPathBase}${ext.startsWith('.') ? ext : `.${ext}`}`;
  await mkdir(dirname(destPath), { recursive: true });

  if (hasProxyEnv()) {
    await curlDownloadFile(sourceUrl, destPath);
    return destPath;
  }

  const res = await fetch(sourceUrl, {
    headers: { 'User-Agent': UA, Accept: 'image/*' },
    redirect: 'follow',
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`thumb HTTP ${res.status}`);

  const resolvedExt =
    extname(new URL(sourceUrl).pathname) || extFromContentType(res.headers.get('content-type'));
  const resolvedPath = `${destPathBase}${resolvedExt.startsWith('.') ? resolvedExt : `.${resolvedExt}`}`;
  await mkdir(dirname(resolvedPath), { recursive: true });
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(resolvedPath, buf);
  return resolvedPath;
}

/** Resolve final thumbnail URL/path for a row after sync. */
export function resolveThumbnail(row, thumbCdnBase) {
  const cdn = row.thumbnail_cdn?.trim();
  if (cdn) return cdn;

  const override = row.thumbnail_override?.trim();
  if (override) return override;

  return '';
}

export function cdnUrlForId(thumbCdnBase, id, ext = '.webp') {
  return `${thumbCdnBase}/${id}${ext}`;
}
