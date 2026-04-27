#!/usr/bin/env node
// Generate public/downloads/accord.md from src/content/accord/*.mdx
// MDX is the single source of truth for the accord text. This script is the
// only writer of accord.md. Run it via npm scripts before dev/build.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const accordDir = path.join(root, 'src/content/accord');
const out = path.join(root, 'public/downloads/accord.md');

const VERSION = '0.1 (draft)';
const ISSUED = '6 April 2026';
const ISSUED_ISO = '2026-04-06';

function parse(file) {
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
  let body = m[2];
  // Strip MDX import lines
  body = body.replace(/^\s*import\s+.+?from\s+['"][^'"]+['"];?\s*$/gm, '');
  // Strip self-closing JSX components (e.g. <LWDRBlock />)
  body = body.replace(/^\s*<[A-Z][A-Za-z0-9]*(\s[^/>]*)?\s*\/>\s*$/gm, '');
  // Collapse blank-line runs
  body = body.replace(/\n{3,}/g, '\n\n').trim();
  return { fm, body };
}

const entries = fs
  .readdirSync(accordDir)
  .filter((f) => f.endsWith('.mdx'))
  .map((f) => ({ file: f, ...parse(path.join(accordDir, f)) }));

entries.sort((a, b) => a.fm.order - b.fm.order);

const lines = [];
lines.push('# The Open Small Models Accord');
lines.push('');
lines.push('*On open, accessible, and correctable AI for the next decade*');
lines.push('');
lines.push(`**Version ${VERSION} · Issued ${ISSUED}**`);
lines.push('');
lines.push(
  'The accord is a dated document. Its claims about openness are stated as ' +
    'of the issue date above. Subsequent versions update the snapshot.',
);
lines.push('');

for (const { fm, body } of entries) {
  if (fm.number === null || fm.number === undefined) {
    lines.push(`**${fm.title}**`);
  } else {
    lines.push(`## ${fm.number}. ${fm.title}`);
  }
  lines.push('');
  lines.push(body);
  lines.push('');
}

lines.push('---');
lines.push('');
lines.push(
  `The Open Small Models Accord, version ${VERSION}, issued ${ISSUED}, ` +
    'authored by [Anivar Aravind](https://anivar.net). ' +
    'Hosted at [openslm.ai](https://openslm.ai/). Released under ' +
    '[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). ' +
    'Translate, adapt, republish. Endorse by signing. Build according to the principles.',
);
lines.push('');
void ISSUED_ISO;

const md = lines.join('\n');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md);

const kb = (md.length / 1024).toFixed(1);
console.log(`accord.md → ${path.relative(root, out)} (${kb} KB, ${entries.length} sections)`);
