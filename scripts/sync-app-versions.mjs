#!/usr/bin/env node
/**
 * Fetch latest GitHub release tags and write src/config/app-versions.generated.json.
 * Same pattern as openterface_docs/scripts/sync-app-versions.mjs.
 * Falls back to defaults / last generated file on network failure.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const DEFAULTS_PATH = join(REPO_ROOT, 'src/config/app-versions.defaults.json');
const GENERATED_PATH = join(REPO_ROOT, 'src/config/app-versions.generated.json');

const REPOS = {
  qt_version: 'TechxArtisanStudio/Openterface_QT',
  android_version: 'TechxArtisanStudio/Openterface_Android',
  macos_version: 'TechxArtisanStudio/Openterface_MacOS',
};

async function latestTag(repo) {
  const url = `https://api.github.com/repos/${repo}/releases/latest`;
  const res = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'openterface-marketing-build' },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.tag_name ?? null;
}

function loadJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function loadBaseVersions() {
  if (existsSync(GENERATED_PATH)) return loadJson(GENERATED_PATH);
  if (existsSync(DEFAULTS_PATH)) return loadJson(DEFAULTS_PATH);
  throw new Error('Missing app-versions.defaults.json');
}

async function main() {
  const skipFetch = process.argv.includes('--skip-fetch');
  const versions = loadBaseVersions();
  versions.copyright_year = String(new Date().getFullYear());

  if (skipFetch) {
    console.log('sync-app-versions: --skip-fetch (keeping committed/default values)');
    if (!existsSync(GENERATED_PATH) && existsSync(DEFAULTS_PATH)) {
      Object.assign(versions, loadJson(DEFAULTS_PATH));
      versions.copyright_year = String(new Date().getFullYear());
    }
  } else {
    for (const [key, repo] of Object.entries(REPOS)) {
      try {
        const tag = await latestTag(repo);
        if (tag) {
          versions[key] = tag;
          console.log(`sync-app-versions: ${key} → ${tag}`);
        } else {
          console.warn(`sync-app-versions: could not fetch ${repo}, keeping ${versions[key] ?? '(unset)'}`);
        }
      } catch (err) {
        console.warn(`sync-app-versions: error fetching ${repo}:`, err.message);
      }
    }
  }

  writeFileSync(GENERATED_PATH, `${JSON.stringify(versions, null, 2)}\n`);
  console.log(`sync-app-versions: wrote ${GENERATED_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
