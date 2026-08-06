import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

function proxyArgs() {
  const proxy =
    process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.ALL_PROXY || '';
  return proxy ? ['-x', proxy] : [];
}

/** curl GET — used when Node fetch cannot reach Meta/Instagram (proxy required). */
export async function curlGetText(url, userAgent) {
  const { stdout } = await execFileAsync(
    'curl',
    ['-sL', ...proxyArgs(), '-A', userAgent, '--max-time', '30', url],
    { maxBuffer: 15 * 1024 * 1024 },
  );
  return stdout;
}

/** curl download to destPath (creates/overwrites file). */
export async function curlDownloadFile(url, destPath, userAgent = 'Mozilla/5.0') {
  await execFileAsync('curl', [
    '-sL',
    ...proxyArgs(),
    '-A',
    userAgent,
    '--max-time',
    '60',
    '-o',
    destPath,
    url,
  ]);
  return destPath;
}

export function hasProxyEnv() {
  return Boolean(
    process.env.HTTPS_PROXY || process.env.HTTP_PROXY || process.env.ALL_PROXY,
  );
}
