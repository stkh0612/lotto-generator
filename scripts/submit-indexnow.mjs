// scripts/submit-indexnow.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'lottomate.life';
const KEY = 'd1ae5bcc0a354127ba814e97c4ffe908';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');

// 1. 사이트맵에서 URL 목록 추출
function getUrlsFromSitemap() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error(`[IndexNow] 사이트맵 파일을 찾을 수 없습니다: ${SITEMAP_PATH}`);
    return [];
  }

  const sitemapXml = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  const urls = [];
  let match;

  while ((match = locRegex.exec(sitemapXml)) !== null) {
    urls.push(match[1].trim());
  }

  return Array.from(new Set(urls));
}

// 2. IndexNow API 전송
async function submitToIndexNow(urls) {
  if (!urls || urls.length === 0) {
    console.log('[IndexNow] 전송할 URL이 없습니다.');
    return;
  }

  console.log(`[IndexNow] 총 ${urls.length}개 URL을 IndexNow(Bing 등)로 제출합니다...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  const endpoints = [
    { name: 'Bing IndexNow', url: 'https://www.bing.com/indexnow' },
    { name: 'IndexNow Central API', url: 'https://api.indexnow.org/indexnow' }
  ];

  for (const ep of endpoints) {
    try {
      console.log(`[IndexNow] ${ep.name} 전송 중...`);
      const response = await fetch(ep.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000)
      });

      if (response.status === 200 || response.status === 202) {
        console.log(`[IndexNow] ✅ ${ep.name} 전송 완료! (HTTP ${response.status})`);
      } else {
        const text = await response.text().catch(() => '');
        console.warn(`[IndexNow] ⚠️ ${ep.name} 응답: HTTP ${response.status} (${text})`);
      }
    } catch (err) {
      console.error(`[IndexNow] ❌ ${ep.name} 실패:`, err.name === 'TimeoutError' ? '요청 시간 초과 (8초)' : err.message);
    }
  }
}

// 실행
const urls = getUrlsFromSitemap();
await submitToIndexNow(urls);
