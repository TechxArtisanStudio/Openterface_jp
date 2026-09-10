#!/usr/bin/env node
/**
 * Fetch live campaign stats from Crowd Supply and write src/config/crowd-supply.generated.json.
 * Falls back to the existing generated file on network failure so the build never breaks.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const GENERATED_PATH = join(REPO_ROOT, 'src/config/crowd-supply.generated.json');

const CAMPAIGN_URL = 'https://www.crowdsupply.com/techxartisan/openterface-keymod';
const USER_AGENT = 'openterface-marketing-build';

/** Parse a dollar text like "$16,590" or "<sup>$</sup>16,590" into an integer. */
function parseDollars(raw) {
  const cleaned = raw.replace(/<[^>]*>/g, '').replace(/[$,\s]/g, '');
  return parseInt(cleaned, 10) || 0;
}

/** Extract a number from text that may contain other content. */
function extractNumber(text) {
  const match = text.match(/[\d,]+/);
  return match ? parseInt(match[0].replace(/,/g, ''), 10) : 0;
}

/** Fetch the campaign page and return raw HTML. */
async function fetchCampaignHtml() {
  const res = await fetch(CAMPAIGN_URL, {
    headers: { 'User-Agent': USER_AGENT },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.text();
}

/** Parse campaign stats from the Crowd Supply HTML. */
function parseStats(html) {
  const stats = {};

  // Raised amount — inside .project-pledged
  const pledgedMatch = html.match(/class="project-pledged"[\s\S]*?<span>([\s\S]*?)<\/span>/);
  if (pledgedMatch) stats.raised = parseDollars(pledgedMatch[1]);

  // Goal amount — inside .project-goal
  const goalMatch = html.match(/class="project-goal"[\s\S]*?<span>([\s\S]*?)<\/span>/);
  if (goalMatch) stats.goal = parseDollars(goalMatch[1]);

  // Percent funded — from the progress bar inline style width
  const percentMatch = html.match(/class="status-progress[^"]*"[^>]*>[\s\S]*?style="width:\s*([\d.]+)%/);
  if (percentMatch) stats.percentFunded = Math.round(parseFloat(percentMatch[1]));

  // Factoids: updates, days left, backers — in order inside .factoids
  const factoidsMatch = html.match(/class="factoids"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
  if (factoidsMatch) {
    const factoidsHtml = factoidsMatch[0];
    const factNumbers = [...factoidsHtml.matchAll(/class="fact-number">(\d+)/g)];

    if (factNumbers.length >= 3) {
      stats.updates = parseInt(factNumbers[0][1], 10);
      stats.daysLeft = parseInt(factNumbers[1][1], 10);
      stats.backers = parseInt(factNumbers[2][1], 10);
    }
  }

  return stats;
}

function loadExisting() {
  if (existsSync(GENERATED_PATH)) {
    return JSON.parse(readFileSync(GENERATED_PATH, 'utf8'));
  }
  return null;
}

async function main() {
  const existing = loadExisting();

  let html;
  try {
    html = await fetchCampaignHtml();
  } catch (err) {
    console.error(`sync-crowd-supply: fetch failed: ${err.message}`);
    if (existing) {
      console.log('sync-crowd-supply: keeping existing data (fetch failed)');
      return;
    }
    throw new Error('No existing data and fetch failed');
  }

  const fresh = parseStats(html);
  const merged = { ...existing, ...fresh };

  // Validate we got at least the key fields
  if (!merged.raised || !merged.goal) {
    console.error('sync-crowd-supply: could not parse raised/goal from page HTML');
    if (existing) {
      console.log('sync-crowd-supply: keeping existing data (parse failed)');
      return;
    }
    throw new Error('Could not parse campaign data and no existing fallback');
  }

  merged.fetchedAt = new Date().toISOString();

  // Log changes
  if (existing) {
    const changes = [];
    for (const key of ['raised', 'goal', 'percentFunded', 'backers', 'daysLeft', 'updates']) {
      if (fresh[key] !== undefined && fresh[key] !== existing[key]) {
        changes.push(`${key}: ${existing[key]} → ${fresh[key]}`);
      }
    }
    if (changes.length > 0) {
      console.log(`sync-crowd-supply: updated — ${changes.join(', ')}`);
    } else {
      console.log('sync-crowd-supply: no changes detected');
    }
  } else {
    console.log(`sync-crowd-supply: initial fetch — raised=$${merged.raised}, ${merged.percentFunded}% funded, ${merged.backers} backers`);
  }

  writeFileSync(GENERATED_PATH, `${JSON.stringify(merged, null, 2)}\n`);
  console.log(`sync-crowd-supply: wrote ${GENERATED_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
