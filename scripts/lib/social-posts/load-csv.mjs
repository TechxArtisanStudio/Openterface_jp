import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { parseCsv } from '../parse-csv.mjs';

export async function loadSocialPostsCsv(csvPath, csvCdnUrl) {
  if (existsSync(csvPath)) {
    const text = await readFile(csvPath, 'utf8');
    console.log(`✓ Using local CSV: ${csvPath}`);
    return parseCsv(text);
  }

  try {
    const res = await fetch(csvCdnUrl, { signal: AbortSignal.timeout(15000) });
    if (res.ok) {
      console.log(`✓ Fetched ${csvCdnUrl}`);
      return parseCsv(await res.text());
    }
    console.warn(`⚠ HTTP ${res.status} from CDN`);
  } catch (err) {
    console.warn(`⚠ CDN fetch failed (${err.message})`);
  }

  throw new Error(`Could not load social-posts.csv from ${csvPath} or CDN`);
}
