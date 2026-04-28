#!/usr/bin/env node
// Single build pipeline for the accord.
//
//   src/content/accord/*.mdx   (canonical text, one section per file)
//   src/lib/accord-meta.mjs    (version, date, author, license)
//
//             ↓
//
//   public/downloads/accord.md     (Markdown — always generated)
//   public/downloads/accord.pdf    (PDF — generated if pandoc is available)
//   public/og/accord-og.png        (OG image — generated if rsvg-convert is available)
//
// Bumping a version: edit src/lib/accord-meta.mjs only. Run npm run build.
// Editing the text: edit the matching src/content/accord/NN-*.mdx file.
// Adding a translation: copy the same scripts pattern with a different
// content directory and a different output filename. Nothing else changes.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  VERSION,
  LABEL,
  ISSUED,
  ISSUED_ISO,
  TITLE,
  TAGLINE,
  AUTHOR,
  LICENSE,
} from '../src/lib/accord-meta.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const accordDir = path.join(root, 'src/content/accord');
const outDir = path.join(root, 'public/downloads');
const outMd = path.join(outDir, 'accord.md');
const outPdf = path.join(outDir, 'accord.pdf');
const ogDir = path.join(root, 'public/og');
const ogSvg = path.join(ogDir, 'accord-og.svg');
const ogPng = path.join(ogDir, 'accord-og.png');

// ─── 1. Parse MDX → ordered sections ─────────────────────────────────────────

function parseSection(file) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error(`Missing frontmatter: ${file}`);
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v === '' || v === 'null') v = null;
    else if (/^-?\d+$/.test(v)) v = Number(v);
    else if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    fm[kv[1]] = v;
  }
  let body = m[2]
    .replace(/^\s*import\s+.+?from\s+['"][^'"]+['"];?\s*$/gm, '')
    // Strip JSX tags but keep their inner text:
    //   <LWDR />               → ''       (component with no children)
    //   <DefinedTerm ...>x</…> → 'x'     (inline annotation)
    .replace(/<\/?[A-Z][A-Za-z0-9]*(?:\s[^>]*?)?\s*\/?>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return { fm, body };
}

const sections = fs
  .readdirSync(accordDir)
  .filter((f) => f.endsWith('.mdx'))
  .map((f) => ({ file: f, ...parseSection(path.join(accordDir, f)) }))
  .sort((a, b) => a.fm.order - b.fm.order);

// ─── 2. Render Markdown ──────────────────────────────────────────────────────

const md = (() => {
  const L = [];
  L.push(`# ${TITLE}`, '');
  L.push(`*${TAGLINE.replace(/\.$/, '')}*`, '');
  L.push(`**Version ${LABEL} · Issued ${ISSUED}**`, '');
  for (const { fm, body } of sections) {
    L.push(fm.number == null ? `**${fm.title}**` : `## ${fm.number}. ${fm.title}`);
    L.push('', body, '');
  }
  L.push('---', '');
  L.push(
    `${TITLE}, version ${LABEL}, issued ${ISSUED}, ` +
      `authored by [${AUTHOR.name}](${AUTHOR.url}). ` +
      'Hosted at [openslm.ai](https://openslm.ai/). Released under ' +
      `[${LICENSE.name}](${LICENSE.url}). ` +
      'Translate, adapt, republish. Endorse by signing. Build according to the principles.',
    '',
  );
  return L.join('\n');
})();

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outMd, md);
const mdKb = (md.length / 1024).toFixed(1);
console.log(`accord.md  → ${path.relative(root, outMd)} (${mdKb} KB, ${sections.length} sections, v${VERSION})`);

// ─── 3. Render PDF (soft-fail if pandoc missing) ─────────────────────────────

function which(cmd) {
  try {
    execFileSync('which', [cmd], { stdio: ['ignore', 'pipe', 'ignore'] });
    return true;
  } catch {
    return false;
  }
}

// ─── 4. Refresh OG PNG (soft-fail if rsvg-convert missing) ───────────────────

function syncOgImage() {
  if (!fs.existsSync(ogSvg)) {
    console.log('accord-og.png → skipped (no source SVG at public/og/accord-og.svg)');
    return;
  }
  if (!which('rsvg-convert')) {
    console.log('accord-og.png → skipped (rsvg-convert not installed; apt install librsvg2-bin to enable)');
    return;
  }
  try {
    execFileSync('rsvg-convert', ['-w', '1200', '-h', '630', ogSvg, '-o', ogPng], { stdio: 'inherit' });
    const pngKb = (fs.statSync(ogPng).size / 1024).toFixed(1);
    console.log(`accord-og.png → ${path.relative(root, ogPng)} (${pngKb} KB)`);
  } catch (err) {
    console.error('accord-og.png → FAILED:', err.message);
  }
}

syncOgImage();

if (!which('pandoc')) {
  console.log('accord.pdf → skipped (pandoc not installed; install pandoc + texlive-xetex to enable)');
  process.exit(0);
}

const pandocArgs = [
  outMd,
  '-o', outPdf,
  '--pdf-engine=xelatex',
  '-V', 'documentclass=article',
  '-V', 'papersize=a4',
  '-V', 'geometry:margin=1in',
  '-V', 'fontsize=11pt',
  '-V', 'linkcolor=NavyBlue',
  '-V', 'urlcolor=NavyBlue',
  '-V', `title=${TITLE}`,
  '-V', `subtitle=${TAGLINE.replace(/\.$/, '')}`,
  '-V', `author=${AUTHOR.name}`,
  '-V', `date=Version ${LABEL} · Issued ${ISSUED}`,
  '--toc',
  '--toc-depth=2',
  '--top-level-division=section',
  '--metadata', `lang=en`,
];

try {
  execFileSync('pandoc', pandocArgs, { stdio: 'inherit' });
  const pdfKb = (fs.statSync(outPdf).size / 1024).toFixed(1);
  console.log(`accord.pdf → ${path.relative(root, outPdf)} (${pdfKb} KB, v${VERSION})`);
} catch (err) {
  console.error('accord.pdf → FAILED:', err.message);
  console.error('  (markdown still generated; remove old PDF if you want to ship without one)');
  process.exit(1);
}

void ISSUED_ISO;
