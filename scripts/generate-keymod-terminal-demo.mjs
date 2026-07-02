#!/usr/bin/env node
/**
 * Sync Terminal Preview demo chunks from KeyCmd Android assets.
 * Usage: node scripts/generate-keymod-terminal-demo.mjs [path/to/demo_ble.ansi]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultAnsi = path.resolve(
  __dirname,
  '../../../openterface/Openterface_KeyCmd_Android/app/src/main/assets/terminal/demo_ble.ansi',
);
const outFile = path.resolve(__dirname, '../src/data/keymodTerminalDemo.ts');

const COLOR_CLASS = {
  '1;32': 'km-terminal-ansi--green',
  '90': 'km-terminal-ansi--gray',
  '33': 'km-terminal-ansi--yellow',
  '1;37': 'km-terminal-ansi--white',
  '1;34': 'km-terminal-ansi--blue',
  '36': 'km-terminal-ansi--cyan',
};

const SEPARATOR_DASH_COUNT = 21;

/** Collapse long box-drawing separator lines so they fit the phone mock width. */
function normalizeSeparatorLines(html) {
  return html.replace(/  ─{10,}/g, `  ${'─'.repeat(SEPARATOR_DASH_COUNT)}`);
}

/** Use shorter copy that fits the phone mock without ellipsis truncation. */
function normalizeLongLines(html) {
  return html
    .replace(
      /  Last login: [^\n]+/,
      '  Last login: Jun 26 10:42 2026',
    )
    .replace(
      /<span class="km-terminal-ansi--dim">Linux openterface[^<]*<\/span>/,
      '<span class="km-terminal-ansi--dim">Linux openterface 6.1.0-keymod #1</span>',
    )
    .replace(
      /(<span class="km-terminal-ansi--white"># ls --color=auto<\/span>\n)[\s\S]*?(\n\n<span class="km-terminal-ansi--cyan">root)/,
      '$1<span class="km-terminal-ansi--blue">bin</span> <span class="km-terminal-ansi--blue">etc</span> <span class="km-terminal-ansi--green">home</span> <span class="km-terminal-ansi--magenta">root</span>$2',
    );
}

/** Add explicit ANSI spans for command output, prompts, and ls --color accents. */
function enrichTerminalColors(html) {
  return html
    .replace(
      /(<span class="km-terminal-ansi--blue">~<\/span>)# uname -a\nLinux openterface([^\n]+)\n\n/g,
      '$1<span class="km-terminal-ansi--white"># uname -a</span>\n<span class="km-terminal-ansi--dim">Linux openterface$2</span>\n\n',
    )
    .replace(
      /(<span class="km-terminal-ansi--blue">~<\/span>)# ls --color=auto\n/g,
      '$1<span class="km-terminal-ansi--white"># ls --color=auto</span>\n',
    )
    .replace(
      /(<span class="km-terminal-ansi--blue">~<\/span>)# $/,
      '$1<span class="km-terminal-ansi--white"># </span>',
    )
    .replace(
      /<span class="km-terminal-ansi--white">root@openterface<\/span>/g,
      '<span class="km-terminal-ansi--cyan">root</span><span class="km-terminal-ansi--dim">@</span><span class="km-terminal-ansi--green">openterface</span>',
    )
    .replace(
      '<span class="km-terminal-ansi--blue">home</span>',
      '<span class="km-terminal-ansi--green">home</span>',
    )
    .replace(
      '<span class="km-terminal-ansi--blue">root</span>',
      '<span class="km-terminal-ansi--magenta">root</span>',
    );
}

function finalizeTerminalHtml(html) {
  return injectKeymodBanner(
    normalizeLongLines(enrichTerminalColors(normalizeSeparatorLines(html))),
  );
}

/** Unicode block "KM" — 6 rows, K + gap + M (fits phone mock at banner font-size). */
const BANNER_INDENT = '  ';
const KEYMOD_BANNER_LINES = [
  '██╗  ██╗  ███╗   ███╗',
  '██║ ██╔╝  ████╗ ████║',
  '█████╔╝   ██╔████╔██║',
  '██╔═██╗   ██║╚██╔╝██║',
  '██║  ╚██╗ ██║ ╚═╝ ██║',
  '╚═╝   ╚═╝ ╚═╝     ╚═╝',
];
const BANNER_WIDTH =
  Math.max(...KEYMOD_BANNER_LINES.map((line) => BANNER_INDENT.length + line.length)) + 0;
const KEYMOD_BANNER_LINES_PADDED = KEYMOD_BANNER_LINES.map(
  (line) => BANNER_INDENT + line.padEnd(BANNER_WIDTH - BANNER_INDENT.length),
);

/** @param {string} ch */
function escapeHtmlChar(ch) {
  if (ch === '&') return '&amp;';
  if (ch === '<') return '&lt;';
  if (ch === '>') return '&gt;';
  return ch;
}

function buildKeymodBannerHtml() {
  const lines = KEYMOD_BANNER_LINES_PADDED.map((line) => {
    const escaped = [...line].map((ch) => escapeHtmlChar(ch)).join('');
    return `<span class="km-terminal-banner__line">${escaped}</span>`;
  }).join('');

  return `<span class="km-terminal-banner km-terminal-banner--keymod">${lines}</span>`;
}

const KEYMOD_BANNER_HTML = buildKeymodBannerHtml();

const TITLE_HTML = '<span class="km-terminal-ansi--green">  KeyCmd Terminal\n</span>';

const HEADER_SEPARATOR_HTML = `<span class="km-terminal-ansi--gray">  ${'─'.repeat(SEPARATOR_DASH_COUNT)}\n\n</span>`;

const TERMINAL_DEMO_HEADER_HTML = TITLE_HTML + KEYMOD_BANNER_HTML + HEADER_SEPARATOR_HTML;

const TITLE_BANNER_ANCHOR = TITLE_HTML;

const TITLE_BANNER_LEGACY =
  '<span class="km-terminal-ansi--green">  Openterface KeyCmd Terminal\n</span>';

/** @param {string} html */
function injectKeymodBanner(html) {
  const withTitle = html.includes(TITLE_BANNER_ANCHOR)
    ? html
    : html.replace(TITLE_BANNER_LEGACY, TITLE_BANNER_ANCHOR);
  if (!withTitle.includes(TITLE_BANNER_ANCHOR)) return html;
  let result = withTitle.replace(TITLE_BANNER_ANCHOR, TERMINAL_DEMO_HEADER_HTML);
  const afterHeader = result.slice(TERMINAL_DEMO_HEADER_HTML.length);
  if (afterHeader.startsWith(HEADER_SEPARATOR_HTML)) {
    result = TERMINAL_DEMO_HEADER_HTML + afterHeader.slice(HEADER_SEPARATOR_HTML.length);
  }
  return result;
}

/** @param {string} fullHtml */
function splitHeaderAndSession(fullHtml) {
  const headerEnd = fullHtml.indexOf(HEADER_SEPARATOR_HTML);
  if (headerEnd === -1) {
    return { headerHtml: TERMINAL_DEMO_HEADER_HTML, sessionHtml: fullHtml };
  }
  const splitAt = headerEnd + HEADER_SEPARATOR_HTML.length;
  return {
    headerHtml: fullHtml.slice(0, splitAt),
    sessionHtml: fullHtml.slice(splitAt),
  };
}

/**
 * Split finalized HTML for streaming without breaking tags or mid-escape.
 * Tags are atomic; text runs may split on newlines for typewriter pacing.
 * @param {string} html
 * @param {number} targetSize
 */
function htmlUnits(html) {
  /** @type {string[]} */
  const units = [];
  let i = 0;
  while (i < html.length) {
    if (html[i] === '<') {
      const close = html.indexOf('>', i);
      if (close === -1) {
        units.push(html.slice(i));
        break;
      }
      units.push(html.slice(i, close + 1));
      i = close + 1;
      continue;
    }
    let j = i;
    while (j < html.length && html[j] !== '<') j++;
    units.push(html.slice(i, j));
    i = j;
  }
  return units.filter((unit) => unit.length > 0);
}

/** @param {string} text @param {number} maxLen */
function splitTextUnit(text, maxLen) {
  if (text.length <= maxLen) return [text];
  /** @type {string[]} */
  const parts = [];
  let i = 0;
  while (i < text.length) {
    let end = Math.min(i + maxLen, text.length);
    const nl = text.lastIndexOf('\n', end - 1);
    if (nl > i) end = nl + 1;
    parts.push(text.slice(i, end));
    i = end;
  }
  return parts;
}

/** @param {string} html */
function countUnclosedSpans(html) {
  return (html.match(/<span\b/g) || []).length - (html.match(/<\/span>/g) || []).length;
}

/** @param {string} html @param {number} targetSize */
function chunkHtmlSafely(html, targetSize) {
  const units = htmlUnits(html);

  /** @type {string[]} */
  const deltas = [];
  let current = '';

  for (const unit of units) {
    const pieces =
      unit.startsWith('<') || countUnclosedSpans(current) > 0
        ? [unit]
        : splitTextUnit(unit, targetSize);

    for (const piece of pieces) {
      if (piece.length > targetSize && current.length === 0 && countUnclosedSpans(piece) === 0) {
        deltas.push(piece);
        continue;
      }

      const nextLen = current.length + piece.length;
      if (nextLen > targetSize && current.length > 0 && countUnclosedSpans(current) === 0) {
        deltas.push(current);
        current = piece;
        continue;
      }

      current += piece;
    }
  }

  if (current.length > 0) deltas.push(current);
  return deltas;
}

class AnsiHtmlParser {
  constructor() {
    this.html = '';
    /** @type {string | null} */
    this.openClass = null;
    /** @type {number} */
    this.textStart = 0;
    /** @type {number} */
    this.i = 0;
    /** @type {Buffer | null} */
    this.bytes = null;
  }

  /** @param {Buffer} bytes */
  reset(bytes) {
    this.bytes = bytes;
    this.html = '';
    this.openClass = null;
    this.textStart = 0;
    this.i = 0;
  }

  /** @param {number} end @param {boolean} final */
  parseUntil(end, final) {
    if (!this.bytes) return '';
    const prevHtml = this.html;
    const limit = final ? end : this.findSafeEnd(end);
    this.consume(limit);
    return this.html.slice(prevHtml.length);
  }

  /** @param {number} end */
  findSafeEnd(end) {
    if (!this.bytes) return end;
    let safe = end;
    while (safe > this.i && !this.isSafeCut(safe)) safe--;
    return Math.max(safe, this.i);
  }

  /** @param {number} pos */
  isSafeCut(pos) {
    if (!this.bytes || pos <= 0 || pos >= this.bytes.length) return true;
    const bytes = this.bytes;
    if (bytes[pos] >= 0x80 && bytes[pos] < 0xc0) return false;
    let j = pos - 1;
    while (j >= 0 && bytes[j] >= 0x30 && bytes[j] <= 0x3f) j--;
    if (j >= 0 && bytes[j] === 0x5b && j > 0 && bytes[j - 1] === 0x1b) return false;
    return true;
  }

  /** @param {number} limit */
  consume(limit) {
    if (!this.bytes) return;
    const bytes = this.bytes;
    while (this.i < limit) {
      if (bytes[this.i] === 0x1b && bytes[this.i + 1] === 0x5b) {
        this.flushText(this.i);
        let j = this.i + 2;
        while (j < limit && !(bytes[j] >= 0x40 && bytes[j] <= 0x7e)) j++;
        if (j >= limit) break;
        const code = bytes.subarray(this.i + 2, j).toString('ascii') + String.fromCharCode(bytes[j]);
        this.applyCode(code);
        this.i = j + 1;
        this.textStart = this.i;
        continue;
      }
      this.i++;
    }
    this.flushText(this.i);
  }

  /** @param {number} end */
  flushText(end) {
    if (!this.bytes || end <= this.textStart) return;
    const text = this.bytes.subarray(this.textStart, end).toString('utf8');
    for (const ch of text) {
      if (ch === '\n') this.html += '\n';
      else if (ch === '<') this.html += '&lt;';
      else if (ch === '>') this.html += '&gt;';
      else if (ch === '&') this.html += '&amp;';
      else this.html += ch;
    }
    this.textStart = end;
  }

  /** @param {string} code */
  applyCode(code) {
    if (code === '0m') {
      this.closeSpan();
      return;
    }
    if (code === '2J' || code === 'H' || code === '?25h') return;
    if (!code.endsWith('m')) return;
    const cls = COLOR_CLASS[code.slice(0, -1)];
    if (cls) this.openSpan(cls);
  }

  closeSpan() {
    if (this.openClass) {
      this.html += '</span>';
      this.openClass = null;
    }
  }

  /** @param {string} cls */
  openSpan(cls) {
    this.closeSpan();
    this.html += `<span class="${cls}">`;
    this.openClass = cls;
  }

  finish() {
    if (!this.bytes) return;
    this.consume(this.bytes.length);
    this.closeSpan();
  }
}

/** @param {Buffer} script */
function parseFullHtml(script) {
  const parser = new AnsiHtmlParser();
  parser.reset(script);
  parser.finish();
  return finalizeTerminalHtml(parser.html);
}

const ansiPath = process.argv[2] ? path.resolve(process.argv[2]) : defaultAnsi;
if (!fs.existsSync(ansiPath)) {
  console.error(`ANSI file not found: ${ansiPath}`);
  process.exit(1);
}

const script = fs.readFileSync(ansiPath);
const fullHtml = parseFullHtml(script);
const { headerHtml, sessionHtml } = splitHeaderAndSession(fullHtml);
const usbChunks = chunkHtmlSafely(sessionHtml, 280);
const bleChunks = chunkHtmlSafely(sessionHtml, 14);

const output = `/** Auto-generated by scripts/generate-keymod-terminal-demo.mjs — do not edit by hand. */
export const TERMINAL_DEMO_HOST = '192.168.12.1';

export type TerminalDemoTransport = 'usb' | 'ble';

export const TERMINAL_DEMO_TRANSPORT = {
  usb: { startDelayMs: 120, chunkSize: 280, chunkDelayMs: 6 },
  ble: { startDelayMs: 450, chunkSize: 14, chunkDelayMs: 72 },
} as const;

export const TERMINAL_DEMO_HEADER_HTML = ${JSON.stringify(headerHtml)};

export const TERMINAL_DEMO_SESSION_HTML = ${JSON.stringify(sessionHtml)};

export const TERMINAL_DEMO_FULL_HTML = ${JSON.stringify(fullHtml)};

export const TERMINAL_DEMO_CHUNKS: Record<TerminalDemoTransport, string[]> = {
  usb: ${JSON.stringify(usbChunks)},
  ble: ${JSON.stringify(bleChunks)},
};
`;

fs.writeFileSync(outFile, output);
console.log(`Wrote ${outFile} (${script.length} bytes → ${usbChunks.length} USB / ${bleChunks.length} BLE chunks)`);
