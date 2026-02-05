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
  // 여러 API 형식 지원
  if (api.ltEpsd !== undefined) {
    // 공식 selectPstLt645Info.do API 형식
    const date = String(api.ltRflYmd);
    const formattedDate = date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8);
    return {
      round: Number(api.ltEpsd),
      draw_date: formattedDate,
      num1: Number(api.tm1WnNo),
      num2: Number(api.tm2WnNo),
      num3: Number(api.tm3WnNo),
      num4: Number(api.tm4WnNo),
      num5: Number(api.tm5WnNo),
      num6: Number(api.tm6WnNo),
      bonus: Number(api.bnsWnNo),
    };
  } else {
    // 기존 공식 API 형식 (drwNo 방식)
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
}

async function fetchRound(round) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 20000);
  
  try {
    // API 1: 공식 selectPstLt645Info.do (전체 데이터 한번에 가져오기) - 캐시됨
    if (!globalThis._lottoCache) {
      try {
        const res = await fetch('https://www.dhlottery.co.kr/lt645/selectPstLt645Info.do?srchLtEpsd=all', {
          signal: ctrl.signal,
          headers: { 
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.data && data.data.list && Array.isArray(data.data.list)) {
            // 캐시에 저장
            globalThis._lottoCache = {};
            data.data.list.forEach(item => {
              globalThis._lottoCache[item.ltEpsd] = item;
            });
            log(`Loaded ${data.data.list.length} rounds from official API`);
          }
        }
      } catch (e) {
        log(`Official API cache failed: ${e.message}`);
      }
    }
    
    // 캐시된 데이터에서 조회
    if (globalThis._lottoCache && globalThis._lottoCache[round]) {
      return {
        returnValue: 'success',
        ...globalThis._lottoCache[round]
      };
    }
    
    // API 2: 개별 조회 (폴백)
    const apis = [
      async () => {
        const res = await fetch(`https://www.dhlottery.co.kr/gameResult.do?method=getLottoNumber&drwNo=${round}&json=Y`, {
          signal: ctrl.signal,
          headers: { 
            'User-Agent': 'Mozilla/5.0',
            'Accept': 'application/json'
          }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const contentType = res.headers.get('content-type');
        
        let data;
        if (contentType?.includes('json')) {
          data = await res.json();
        } else {
          throw new Error('Got HTML instead of JSON');
        }
        
        if (data && data.returnValue === 'success' && data.drwNo) {
          return data;
        }
        throw new Error('Invalid response format');
      }
    ];
    
    for (const apiFn of apis) {
      try {
        const result = await apiFn();
        if (result && result.returnValue === 'success') {
          return result;
        }
      } catch (e) {
        continue;
      }
    }
    
    return null;
  } catch (e) {
    log(`Failed to fetch round ${round}: ${e.message}`);
    return null;
  } finally {
    clearTimeout(t);
  }
}

async function main() {
  try {
    // 공식 API에서 전체 데이터 가져오기
    const res = await fetch('https://www.dhlottery.co.kr/lt645/selectPstLt645Info.do?srchLtEpsd=all', {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    
    const data = await res.json();
    if (!data || !data.data || !data.data.list) {
      throw new Error('Invalid API response format');
    }
    
    const apiList = data.data.list;
    const existing = await readJson(DATA_PATH);
    const existingRounds = new Set(existing.map(x => Number(x.round)));
    
    // API에서 가져온 데이터를 업데이트할 항목 찾기
    const added = [];
    for (const apiItem of apiList) {
      const round = Number(apiItem.ltEpsd);
      if (!existingRounds.has(round)) {
        added.push(toEntry(apiItem));
      }
    }
    
    if (added.length === 0) {
      log('No new rounds found. Current max:', Math.max(...existing.map(x => Number(x.round))));
      return;
    }
    
    // 최신순(내림차순)으로 정렬
    added.sort((a, b) => b.round - a.round);
    const merged = [...added, ...existing];
    
    const out = JSON.stringify(merged, null, 2) + '\n';
    if (DRY_RUN) {
      log(`Would add ${added.length} rounds: ${added.at(-1).round}-${added[0].round}`);
      return;
    }
    
    await fs.writeFile(DATA_PATH, out, 'utf8');
    log(`Added ${added.length} new rounds: ${added.at(-1).round}-${added[0].round}`);
  } catch (e) {
    log(`Main API failed: ${e.message}, falling back to sequential fetch`);
    
    // 폴백: 기존 방식으로 진행
    const existing = await readJson(DATA_PATH);
    const maxRound = existing.reduce((m, x) => Math.max(m, Number(x.round) || 0), 0);
    let next = maxRound + 1;
    const added = [];
    
    for (;;) {
      let data;
      try {
        data = await fetchRound(next);
      } catch (e) {
        log(`Stopped at round ${next}: ${e.message}`);
        break;
      }
      if (!data || data.returnValue !== 'success') {
        break;
      }
      added.push(toEntry(data));
      next += 1;
    }
    
    if (added.length === 0) {
      log('No new rounds found. Current max:', maxRound);
      return;
    }
    
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
}

main().catch((err) => {
  console.error('[update-lotto] Failed:', err?.stack || err?.message || String(err));
  process.exitCode = 1;
});

