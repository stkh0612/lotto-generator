#!/usr/bin/env node
// Update src/assets/lotto_numbers_en.json with the latest draws from the official API

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const DATA_PATH = path.resolve(projectRoot, 'src/assets/lotto_numbers_en.json');

const ARGS = new Set(process.argv.slice(2));
const DRY_RUN = ARGS.has('--dry-run');

function log(...args) {
  // Simple logger
  console.log('[update-lotto]', ...args);
}

async function readJson(file) {
  const txt = await fs.readFile(file, 'utf8');
  try {
    return JSON.parse(txt);
  } catch (e) {
    throw new Error(`Failed to parse JSON at ${file}: ${e.message}`);
  }
}

function toEntry(api) {
  return {
    round: Number(api.drwNo),
    draw_date: new Date(api.drwNoDate).toISOString().slice(0, 10),
    num1: Number(api.drwtNo1),
    num2: Number(api.drwtNo2),
    num3: Number(api.drwtNo3),
    num4: Number(api.drwtNo4),
    num5: Number(api.drwtNo5),
    num6: Number(api.drwtNo6),
    bonus: Number(api.bnusNo),
  };
}

async function fetchRound(round) {
  const url = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${round}`;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } finally {
    clearTimeout(t);
  }
}

async function main() {
  const existing = await readJson(DATA_PATH);
  const maxRound = existing.reduce((m, x) => Math.max(m, Number(x.round) || 0), 0);
  let next = maxRound + 1;
  const added = [];

  for (;;) {
    let data;
    try {
      data = await fetchRound(next);
    } catch (e) {
      // Network issues or timeout; stop trying further
      log(`Stopped at round ${next}: ${e.message}`);
      break;
    }
    if (!data || data.returnValue !== 'success') {
      break; // No newer round yet
    }
    added.push(toEntry(data));
    next += 1;
  }

  if (added.length === 0) {
    log('No new rounds found. Current max:', maxRound);
    return;
  }

  // Prepend new items (newest first)
  added.sort((a, b) => b.round - a.round);
  const merged = [...added, ...existing];

  const out = JSON.stringify(merged, null, 2) + '\n';
  if (DRY_RUN) {
    log(`Would add ${added.length} rounds: ${added.at(-1).round}-${added[0].round}`);
    return;
  }
  await fs.writeFile(DATA_PATH, out, 'utf8');
  log(`Added ${added.length} new rounds: ${added.at(-1).round}-${added[0].round}`);
}

main().catch((err) => {
  console.error('[update-lotto] Failed:', err?.stack || err?.message || String(err));
  process.exitCode = 1;
});

