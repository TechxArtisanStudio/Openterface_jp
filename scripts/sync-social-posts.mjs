#!/usr/bin/env node
/** Thin wrapper — delegates to web-dev-tool sync-social-posts.mjs */
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const script = resolve(ROOT, '../web-dev-tool/scripts/sync-social-posts.mjs');

const result = spawnSync(process.execPath, [script, ...process.argv.slice(2), '--repo=openterface_en'], {
  stdio: 'inherit',
  cwd: ROOT,
});

process.exit(result.status ?? 1);
