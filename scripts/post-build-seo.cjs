// scripts/post-build-seo.cjs
const fs = require('fs');
const path = require('path');

// 1. 블로그 아티클 데이터 불러오기
const blogPostsPath = path.join(__dirname, '../src/assets/blog_posts.json');
let blogPosts = [];
try {
  blogPosts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));
} catch (e) {
  console.warn('[post-build-seo] blog_posts.json 로드 실패, 블로그 상세 SEO 생성 불가:', e);
}

// 2. 정적 페이지용 메타데이터 및 바디 내용 정의
const staticSeoConfig = {
  '/': {
    title: '로또메이트 · 로또 번호 생성기 & 당첨 확인',
    description: '중복 없는 로또 번호를 자동 생성하고 저장하며 지난 회차 당첨 결과까지 확인할 수 있는 Vue 기반 로또 도우미입니다.',
    keywords: '로또메이트, 로또 번호 생성기, 로또 당첨 확인, 번호 추천, 무료 로또',
    h1: '로또메이트 (LottoMate)',
    body: '<p>로또메이트는 균형 있는 번호 필터링 생성과 투명한 당첨 분석, 가상 수익률 시뮬레이션을 제공하는 건전한 복권 동반자입니다.</p>'
  },
  '/about': {
    title: '로또메이트 소개 · 서비스 철학 및 건전한 복권 이용 강령',
    description: '로또메이트(LottoMate) 서비스의 기획 의도, 운영 철학, 제공 서비스 안내 및 소액으로 즐기는 건전한 복권 구매 행동 강령을 상세히 기록한 법적 면책 페이지입니다.',
    keywords: '로또메이트 소개, 서비스 철학, 복권 행동 강령, 건전한 복권, 문의 사항, 로또메이트',
    h1: '로또메이트 소개',
    body: '<h2>우리의 철학 (Philosophy)</h2><p>대한민국 로또 6/45 추첨은 독립 시행입니다. 미래 당첨 번호를 예측하는 기법은 수학적으로 존재하지 않습니다. 로또메이트는 절대 당첨 번호를 보장하지 않으며, 건전하고 재미있는 하나의 오락으로 복권을 즐길 수 있도록 돕습니다.</p><h2>건전한 복권 구매 행동 강령</h2><p>주당 1만원 이하의 소액으로 건전하게 복권을 대하시기 바랍니다. 복권은 결코 투자나 재테크 수단이 될 수 없습니다. 과도한 몰입 방지를 권장합니다.</p><h2>문의 메일</h2><p>서비스 제안 및 데이터 보정 피드백은 stkh0612@gmail.com 으로 문의 부탁드립니다.</p>'
  },
  '/privacy': {
    title: '개인정보처리방침 · 로또메이트',
    description: '로또메이트의 개인정보처리방침입니다. 사용자의 쿠키 정보 보호 및 맞춤형 광고 거부 방법 등에 대해 안내합니다.',
    keywords: '개인정보처리방침, 개인정보 보호, 로또메이트 약관',
    h1: '개인정보처리방침',
    body: '<p>로또메이트는 개인정보 보호법에 의거하여 이용자의 개인정보 및 브라우저 쿠키 정책을 투명하게 공시하며, 구글 애드센스 맞춤형 광고 거부(Opt-out) 방법 및 정보 주체의 권리를 소상히 명시하고 보장합니다.</p>'
  },
  '/terms': {
    title: '이용약관 · 로또메이트',
    description: '로또메이트 서비스의 이용 약관 및 회원 약관, 면책 조항에 대한 상세 내용을 고지합니다.',
    keywords: '이용약관, 로또메이트 약관, 면책 조항',
    h1: '이용약관',
    body: '<p>로또메이트 서비스의 이용 조건 및 면책 사항에 관한 약관입니다. 본 사이트의 데이터 대조 결과는 정보 참고용이며, 실제 금융 당첨에 따른 모든 권리와 의무는 동행복권 실물 티켓을 소지한 본인에게 귀속됩니다.</p>'
  },
  '/guide': {
    title: '로또 실수령 계산기 및 세무 가이드 · 로또메이트',
    description: '로또 당첨금 세금 계산법, 지급 기한, 당첨금 수령을 위한 준비물과 농협은행 본점 방문 등 수령 절차 전반을 상세 안내합니다.',
    keywords: '로또 실수령 계산기, 로또 수령법, 로또 세금, 농협은행 본점, 로또 가이드',
    h1: '로또 가이드 및 실수령 계산기',
    body: '<p>로또 당첨금 수령 방법, 지급 장소, 필요 서류 및 금액대별 세금(소득세, 주민세) 정보를 계산하여 제공하는 가이드 페이지입니다.</p>'
  },
  '/blog': {
    title: '로또메이트 블로그 아티클 · 로또 전문 정보',
    description: '로또메이트 블로그에서 전해드리는 전문적이고 깊이 있는 로또 통계, 분석, 세금 및 수령 가이드입니다.',
    keywords: '로또 정보, 로또 분석, 로또 통계, 로또 수령법, 로또메이트',
    h1: '로또메이트 블로그',
    body: '<h2>로또 분석 및 상식 아티클 목록</h2><ul><li>로또 당첨금 세금 계산법 및 소득세율 정리</li><li>역대 당첨 번호 홀짝 비율 및 통계 분석</li><li>로또 명당의 확률적 진실 검증</li><li>814만분의 1 수학적 진실 분석</li><li>로또 1등 당첨금 수령 방법 및 준비물 가이드</li></ul>'
  },
  '/saved': {
    title: '저장된 번호 목록 · 로또메이트',
    description: '로또메이트에서 필터링 생성 후 저장한 나의 번호 조합 목록입니다. 과거 회차와 대조해보세요.',
    keywords: '로또 번호 저장, 로또 관리, 로또번호대조',
    h1: '저장된 번호 목록',
    body: '<p>내가 생성하고 저장한 로또 번호 목록을 확인하고 관리할 수 있습니다.</p>'
  },
  '/simulation': {
    title: '로또 시뮬레이션 및 가상 수익률 대조 · 로또메이트',
    description: '가상의 로또 번호로 지난 20년간 꾸준히 구매했을 경우의 누적 가상 수익률 및 손해율 시뮬레이션 결과를 분석합니다.',
    keywords: '로또 시뮬레이션, 로또 모의시험, 로또 수익률, 로또 확률 체감',
    h1: '로또 시뮬레이션',
    body: '<p>가상 로또 구매를 통해 확률적 난이도를 시각적 수치로 인지할 수 있는 가상 시뮬레이터 프로그램입니다.</p>'
  },
  '/stats': {
    title: '로또 번호 출현 빈도 및 통계 분석 · 로또메이트',
    description: '역대 로또 6/45 번호들의 누적 출현 빈도, 보너스 번호 빈도, 홀짝 비율, 끝수 분포 등 정밀 통계 지표를 공시합니다.',
    keywords: '로또 통계, 로또 출현 빈도, 로또 번호 순위, 로또 역대 당첨 통계',
    h1: '로또 번호 출현 빈도 및 통계',
    body: '<p>로또 6/45 역대 출현 횟수 및 기간별 분포 등 다양한 정밀 수학적 통계를 집계하여 보여줍니다.</p>'
  },
  '/analysis': {
    title: '로또 패턴 및 필터링 생성 · 로또메이트',
    description: '과거 출현 조합 필터링, 제외수 설정, 고합/저합 균형 필터링 등 다차원 조합 추출 방식을 제공합니다.',
    keywords: '로또 분석기, 로또 필터링, 로또 패턴 분석, 로또 번호 조합',
    h1: '로또 패턴 분석 생성',
    body: '<p>과거 패턴 및 통계적 필터 규칙에 기초한 맞춤형 로또 번호 추출 필터링 서비스입니다.</p>'
  },
  '/fortune': {
    title: '오늘의 무료 로또 번호 운세 · 로또메이트',
    description: '재미로 보는 오늘의 별자리 운세, 띠별 운세와 추천 로또 조합 번호를 무료로 매치하여 드립니다.',
    keywords: '로또 운세, 로또 번호 추천, 무료 로또 생성, 행운의 번호',
    h1: '오늘의 무료 로또 번호 운세',
    body: '<p>오늘의 행운 별자리, 띠 정보를 임의 조합한 무료 매칭 로또 번호 추출 재미 코너입니다.</p>'
  },
  '/results': {
    title: '로또 당첨 번호 조회 및 역대 결과 · 로또메이트',
    description: '최신 로또 6/45 당첨 번호 조회, 등수별 당첨금 수령액 안내 및 회차별 당첨 판매점 정보를 조회합니다.',
    keywords: '로또 당첨 번호 조회, 로또 역대 결과, 로또 당첨금, 로또 당첨점',
    h1: '로또 당첨 번호 조회',
    body: '<p>매주 동행복권 실시간 당첨 번호 결과 조회 및 역대 회차 검색용 결과 테이블을 보여줍니다.</p>'
  }
};

// 3. 마크다운 변환 헬퍼 함수
function mdToHtml(md) {
  let html = md;
  // Bold **text** -> <strong>text</strong>
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Formula/Code $formula$ -> <code>formula</code>
  html = html.replace(/\$(.*?)\$/g, '<code>$1</code>');
  // Links [text](url) -> <a href="url">text</a>
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
  // Lists
  html = html.replace(/^\- (.*?)$/gm, '<li>$1</li>');
  
  // Wrap list items in <ul>
  // Simple check for sequences of <li>...</li>
  html = html.replace(/(<li>.*?<\/li>)+/gs, '<ul>$&</ul>');

  // Paragraphs
  html = html.split('\n\n').map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<ol') || p.startsWith('<li') || p.startsWith('<ul>')) return p;
    return `<p>${p}</p>`;
  }).join('\n');
  
  return html;
}

// 4. 경로별 주입 함수
function processRoute(routePath, seoData, customJsonLd = null) {
  // index.html 경로 설정
  let relativeFilePath = routePath === '/' ? 'index.html' : path.join(routePath.substring(1), 'index.html');
  const fullFilePath = path.join(__dirname, '../dist', relativeFilePath);

  if (!fs.existsSync(fullFilePath)) {
    // console.log(`[post-build-seo] 파일 없음 패스: ${relativeFilePath}`);
    return;
  }

  let html = fs.readFileSync(fullFilePath, 'utf8');

  // 메타 태그 교체
  html = html.replace(/<title>.*?<\/title>/, `<title>${seoData.title}</title>`);
  
  // Description
  const descTag = `<meta name="description" content="${seoData.description}">`;
  const ogDescTag = `<meta property="og:description" content="${seoData.description}">`;
  const twDescTag = `<meta name="twitter:description" content="${seoData.description}">`;
  html = html.replace(/<meta name="description" content=".*?">/, descTag);
  html = html.replace(/<meta property="og:description" content=".*?">/, ogDescTag);
  html = html.replace(/<meta name="twitter:description" content=".*?">/, twDescTag);

  // Keywords
  const keyTag = `<meta name="keywords" content="${seoData.keywords}">`;
  html = html.replace(/<meta name="keywords" content=".*?">/, keyTag);

  // Canonical & OG URL
  const canonicalUrl = `https://lottomate.life${routePath === '/' ? '/' : routePath}`;
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}">`;
  const ogUrlTag = `<meta property="og:url" content="${canonicalUrl}">`;
  html = html.replace(/<link rel="canonical" href=".*?">/, canonicalTag);
  html = html.replace(/<meta property="og:url" content=".*?">/, ogUrlTag);

  // OG Title
  const ogTitleTag = `<meta property="og:title" content="${seoData.title}">`;
  const twTitleTag = `<meta name="twitter:title" content="${seoData.title}">`;
  html = html.replace(/<meta property="og:title" content=".*?">/, ogTitleTag);
  html = html.replace(/<meta name="twitter:title" content=".*?">/, twTitleTag);

  // Hreflang 태그 주입
  const canonicalPath = routePath === '/' ? '/' : (routePath.endsWith('/') ? routePath : `${routePath}/`);
  const hreflangTags = [
    `<link rel="alternate" hreflang="ko" href="https://lottomate.life${canonicalPath}">`,
    `<link rel="alternate" hreflang="en" href="https://lottomate.life${canonicalPath}?lang=en">`,
    `<link rel="alternate" hreflang="ja" href="https://lottomate.life${canonicalPath}?lang=ja">`,
    `<link rel="alternate" hreflang="x-default" href="https://lottomate.life${canonicalPath}">`
  ].join('\n  ');

  html = html.replace('</head>', `  ${hreflangTags}\n</head>`);

  // JSON-LD 주입
  if (customJsonLd) {
    const jsonLdScript = `<script id="seo-blogposting-schema" type="application/ld+json">${JSON.stringify(customJsonLd)}</script>`;
    // head가 끝나기 전에 추가
    html = html.replace('</head>', `  ${jsonLdScript}\n</head>`);
  }

  // body HTML 내용 주입 (crawler readability 및 pre-rendering 해결)
  const appBody = `
    <div class="pre-rendered-seo-body" style="display: block; font-family: sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; text-align: left; line-height: 1.8; color: #333;">
      <h1 style="color: #6200EA; font-size: 2.2rem; border-bottom: 2px solid #E0E0E0; padding-bottom: 12px;">${seoData.h1}</h1>
      <div class="content-body" style="font-size: 1.1rem; margin-top: 24px;">
        ${seoData.body}
      </div>
      <hr style="margin: 40px 0; border: 0; border-top: 1px solid #E0E0E0;" />
      <footer style="font-size: 0.9rem; color: #757575;">
        <p>© 2026 로또메이트 (LottoMate). 본 정보는 모의 통계 및 보조 데이터이며 건전한 게임 이용을 장려합니다.</p>
        <p>문의: <a href="mailto:stkh0612@gmail.com" style="color: #6200EA; text-decoration: none;">stkh0612@gmail.com</a> | <a href="/privacy" style="color: #6200EA; text-decoration: none;">개인정보처리방침</a></p>
      </footer>
    </div>
  `;
  
  // Vue가 활성화되면 이 정적 UI는 Vue DOM으로 부드럽게 덮어쓰여집니다(Hydration).
  // 검색봇은 완벽한 정적 글 본문을 읽어 수집하게 됩니다.
  html = html.replace('<div id="app"></div>', `<div id="app">${appBody}</div>`);

  fs.writeFileSync(fullFilePath, html, 'utf8');
  console.log(`[post-build-seo] 정적 주입 완료: ${relativeFilePath}`);
}

// 5. 실행 절차
console.log('[post-build-seo] 정적 파일 대상 SEO 주입 스크립트 실행 시작...');

// 5-1. 일반 정적 페이지 주입
Object.keys(staticSeoConfig).forEach((routePath) => {
  const seoData = staticSeoConfig[routePath];
  processRoute(routePath, seoData);
});

// 5-2. 블로그 개별 기사 주입
blogPosts.forEach((post) => {
  const routePath = `/blog/${post.id}`;
  const title = `${post.title} · 로또메이트 블로그`;
  const description = post.summary;
  const keywords = `로또 분석, ${post.title.substring(0, 15)}, 로또메이트`;
  const h1 = post.title;
  const bodyHtml = `
    <div style="font-size: 0.95rem; color: #757575; margin-bottom: 16px;">
      <span>작성일: ${post.date}</span> | <span>필자: ${post.author}</span>
    </div>
    ${mdToHtml(post.content)}
    <div class="eeat-bio-card" style="background: #f9f9f9; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; margin-top: 40px; display: flex; align-items: center;">
      <div style="font-size: 2rem; margin-right: 16px;">👤</div>
      <div>
        <strong style="color: #6200EA; font-size: 1.1rem;">${post.author} (전문 분석 필진)</strong>
        <p style="margin: 4px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">
          로또메이트 전문 분석 필진으로, 복권 확률 모델 연구, 세무/금융 가이드 작성 및 건전한 게임 이용에 관한 전문 정보를 제공합니다.
        </p>
      </div>
    </div>
  `;

  // JSON-LD BlogPosting Schema 구축
  const canonicalUrl = `https://lottomate.life/blog/${post.id}`;
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': canonicalUrl,
    'headline': post.title,
    'description': post.summary,
    'datePublished': post.date,
    'author': {
      '@type': 'Organization',
      'name': post.author || 'LottoMate'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'LottoMate',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://lottomate.life/og-image.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': canonicalUrl
    }
  };

  processRoute(routePath, { title, description, keywords, h1, body: bodyHtml }, blogPostingSchema);
});

console.log('[post-build-seo] 모든 대상 페이지 주입 완료!');

// 6. 사이트맵 자동 생성 및 파일 갱신
console.log('[post-build-seo] sitemap.xml 자동 생성 시작...');
try {
  const lottoNumbersPath = path.join(__dirname, '../src/assets/lotto_numbers_en.json');
  let lottoRounds = [];
  try {
    const lottoData = JSON.parse(fs.readFileSync(lottoNumbersPath, 'utf8'));
    // 최신 순으로 정렬하여 상위 30개 회차 추출
    const sortedData = lottoData.sort((a, b) => b.round - a.round);
    lottoRounds = sortedData.slice(0, 30).map(r => r.round);
  } catch (e) {
    console.warn('[post-build-seo] lotto_numbers_en.json 로드 실패, 사이트맵에 최신 회차 추가 불가:', e);
  }

  // 사이트맵에 들어갈 URL 목록 빌드
  const urls = [];

  // 1) 정적 페이지
  const staticRoutes = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/results/', changefreq: 'daily', priority: '0.9' },
    { path: '/saved/', changefreq: 'weekly', priority: '0.8' },
    { path: '/compare/', changefreq: 'weekly', priority: '0.8' },
    { path: '/simulation/', changefreq: 'daily', priority: '0.9' },
    { path: '/analysis/', changefreq: 'weekly', priority: '0.7' },
    { path: '/stats/', changefreq: 'monthly', priority: '0.6' },
    { path: '/fortune/', changefreq: 'daily', priority: '0.6' },
    { path: '/guide/', changefreq: 'monthly', priority: '0.5' },
    { path: '/privacy/', changefreq: 'monthly', priority: '0.3' },
    { path: '/terms/', changefreq: 'monthly', priority: '0.3' },
    { path: '/blog/', changefreq: 'weekly', priority: '0.8' },
    { path: '/about/', changefreq: 'monthly', priority: '0.6' }
  ];

  staticRoutes.forEach(r => {
    urls.push(`  <url>
    <loc>https://lottomate.life${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`);
  });

  // 2) 최근 30개 회차 결과 및 비교 페이지
  lottoRounds.forEach(round => {
    urls.push(`  <url>
    <loc>https://lottomate.life/results/${round}/</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`);
    urls.push(`  <url>
    <loc>https://lottomate.life/compare/${round}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  });

  // 3) 블로그 개별 글 상세 페이지
  blogPosts.forEach(post => {
    urls.push(`  <url>
    <loc>https://lottomate.life/blog/${post.id}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  // public/sitemap.xml 및 dist/sitemap.xml 에 저장
  const publicSitemapPath = path.join(__dirname, '../public/sitemap.xml');
  const distSitemapPath = path.join(__dirname, '../dist/sitemap.xml');

  // 디렉토리가 존재하는지 확인 후 쓰기
  fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf8');
  if (fs.existsSync(path.dirname(distSitemapPath))) {
    fs.writeFileSync(distSitemapPath, sitemapXml, 'utf8');
  }
  console.log('[post-build-seo] sitemap.xml 자동 생성 및 업데이트 완료! (경로: public/, dist/)');

} catch (err) {
  console.error('[post-build-seo] sitemap.xml 생성 중 에러 발생:', err);
}
