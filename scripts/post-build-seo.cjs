// scripts/post-build-seo.cjs
const fs = require('fs');
const path = require('path');

// 1. 블로그 아티클 및 로또 데이터 불러오기
const blogPostsPath = path.join(__dirname, '../src/assets/blog_posts.json');
let blogPosts = [];
try {
  blogPosts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));
} catch (e) {
  console.warn('[post-build-seo] blog_posts.json 로드 실패:', e);
}

const lottoNumbersPath = path.join(__dirname, '../src/assets/lotto_numbers_en.json');
let lottoData = [];
try {
  lottoData = JSON.parse(fs.readFileSync(lottoNumbersPath, 'utf8'));
} catch (e) {
  console.warn('[post-build-seo] lotto_numbers_en.json 로드 실패:', e);
}

// 2. 고품질 정적 페이지용 메타데이터 및 상세 본문(SEO Body) 정의
const staticSeoConfig = {
  '/': {
    title: '로또메이트 · 과학적 로또 번호 생성기 및 통계 분석 포털',
    description: '역대 당첨 데이터 필터링, 홀짝/총합 균형 생성, 3D 물리 추첨 시뮬레이터 및 실시간 당첨 번호 대조를 무료로 제공하는 스마트 로또 도우미입니다.',
    keywords: '로또메이트, 로또 번호 생성기, 로또 당첨 확인, 로또 번호 추천, 무료 로또, 로또 통계, 로또 분석',
    h1: '로또메이트 (LottoMate) · 스마트 로또 번호 생성기 & 데이터 분석 포털',
    body: `
      <h2>1. 로또메이트 서비스 소개 및 핵심 알고리즘</h2>
      <p>로또메이트(LottoMate)는 대한민국 동행복권 로또 6/45의 방대한 역대 추첨 데이터를 바탕으로, 통계학적 균형 모델과 정밀 필터링을 결합한 <strong>무료 로또 번호 자동 생성 및 종합 분석 플랫폼</strong>입니다.</p>
      <p>단순한 난수 발생기와 달리, 로또메이트는 과거 1회부터 현재까지 이미 1등으로 출현했던 불필요한 중복 조합을 필터링하고, 통계적으로 지나치게 한쪽으로 치우친 극단적 조합(예: 6개 연속 번호, 6개 모두 홀수/짝수, 특정 번호대에만 6개 몰림)을 배제하여 최적의 균형 조합을 추출합니다.</p>

      <h2>2. 로또 6/45 추첨의 수학적 독립 시행과 필터링의 원리</h2>
      <p>대한민국 로또 6/45는 1부터 45까지의 숫자 중 6개를 무작위로 추첨하는 게임으로, 1등 당첨 확률은 정확히 <strong>1 / 8,145,060 (약 814만분의 1)</strong>입니다. 매 회차 추첨은 이전 결과와 완전히 무관한 <em>독립 시행(Independent Trials)</em>이지만, 수많은 회차가 누적되면서 전체 데이터는 다음과 같은 통계학적 정규 분포를 형성합니다.</p>
      <ul>
        <li><strong>홀짝 비율(Odd/Even)</strong>: 당첨 번호의 81% 이상이 3:3, 4:2, 2:4의 균형 잡힌 비율로 출현합니다.</li>
        <li><strong>총합 구간(Sum Range)</strong>: 6개 숫자의 합계는 약 80% 이상의 확률로 100~170 구간 내에 위치합니다.</li>
        <li><strong>번호대 분포</strong>: 단번대, 10번대, 20번대, 30번대, 40번대 중 최소 3~4개 구간에 골고루 분산되어 출현합니다.</li>
      </ul>

      <h2>3. 주요 제공 기능 및 이용 가이드</h2>
      <ul>
        <li><strong>3D 물리 추첨 믹서</strong>: 실제 방송 추첨기와 동일한 물리 엔진 시뮬레이션으로 생생한 추첨 연출을 지원합니다.</li>
        <li><strong>로또 시뮬레이터</strong>: 과거 1회부터 현재까지 내가 고른 번호로 샀을 때의 가상 수익률과 1등 당첨까지의 소요 기간을 측정합니다.</li>
        <li><strong>역대 통계 및 심층 분석</strong>: 번호별 누적 출현 빈도, 색상 분포, 끝수 통계를 실시간 인터랙티브 차트로 제공합니다.</li>
        <li><strong>타로 & 꿈해몽 운세</strong>: 동양 전통 꿈해몽 키워드 및 타로 메이저 아르카나 시드를 활용한 행운 번호를 추천합니다.</li>
        <li><strong>세금 계산기 및 수령 가이드</strong>: 1등 당첨 시 실수령액과 농협은행 본점 방문 절차를 상세 안내합니다.</li>
      </ul>

      <h2>4. 건전한 복권 문화 및 책임감 있는 이용 원칙</h2>
      <p>로또메이트는 절대 "1등 당첨을 보장한다"거나 "당첨 번호를 100% 예측한다"는 허위/과장 주장을 하지 않습니다. 복권은 한 주의 작은 설렘과 일상의 활력을 더하는 소소한 오락이며, 매주 1만 원 이하의 소액으로 건전하게 즐기시기를 강력히 권장합니다.</p>
    `
  },
  '/stats': {
    title: '로또 번호별 출현 빈도 및 역대 누적 통계 분석 · 로또메이트',
    description: '1회부터 최신 회차까지 로또 45개 번호의 누적 출현 횟수 순위, 최다 빈출수, 최소 출현수 및 끝수 통계 데이터를 정밀 시각화하여 공시합니다.',
    keywords: '로또 통계, 로또 출현 빈도, 로또 번호 순위, 최다 당첨 번호, 로또 끝수 통계, 로또메이트',
    h1: '로또 6/45 역대 번호별 출현 빈도 및 누적 통계 분석',
    body: `
      <h2>1. 로또 45개 번호의 역대 출현 횟수 분석</h2>
      <p>대한민국 로또 6/45의 1회 추첨부터 현재까지 누적된 모든 공식 당첨 번호(보너스 번호 포함/미포함)의 출현 빈도를 전수 집계한 통계 데이터입니다. 총 1,200회 이상의 추첨 데이터 속에서 번호별 편차와 쏠림 현상을 객관적인 수치로 확인하실 수 있습니다.</p>

      <h2>2. 최다 출현 상위 10개 번호 vs 최소 출현 하위 10개 번호</h2>
      <p>통계 집계 결과, 역사상 가장 자주 뽑힌 번호와 상대적으로 적게 뽑힌 번호 사이에는 뚜렷한 빈도 차이가 존재합니다.</p>
      <ul>
        <li><strong>최다 빈출 번호군 (Top Tier)</strong>: 34, 43, 27, 18, 12, 1, 13, 33, 40 등은 평균 기대 출현 빈도보다 약 15~25% 높은 출현율을 기록하고 있습니다.</li>
        <li><strong>최소 출현 번호군 (Bottom Tier)</strong>: 9, 22, 41, 23, 32, 29 등은 추첨기에서 상대적으로 덜 선택되어 통계상 하위권에 머물러 있습니다.</li>
      </ul>

      <h2>3. 대수의 법칙(Law of Large Numbers)과 통계적 해석</h2>
      <p>확률론의 기초인 '대수의 법칙'에 따르면, 추첨 횟수가 수만, 수십만 회로 무한히 증가할 경우 모든 숫자의 출현 빈도는 <strong>1/45 (약 2.22%)</strong>에 완벽히 수렴하게 됩니다. 현재 1,200여 회의 추첨 표본은 대수의 법칙이 완성되는 과정에서의 일시적 표준편차를 나타내며, 이는 번호 조합 시 심리적 지표나 필터링 규칙으로 활용될 수 있습니다.</p>

      <h2>4. 끝수(일의 자리 숫자 0~9) 분포 통계</h2>
      <p>각 번호의 일의 자리수인 끝수 통계를 살펴보면, 특정 끝수에 번호가 편중되지 않고 0부터 9까지의 끝수가 고르게 분포함을 알 수 있습니다. 6개 번호 조합 시 동일한 끝수가 3개 이상 중복되지 않도록 조율하는 것이 일반적인 통계적 균형 접근법입니다.</p>
    `
  },
  '/analysis': {
    title: '로또 심층 패턴 분석 및 합계 구간·색상·홀짝 비율 · 로또메이트',
    description: '최근 100회차 당첨 번호의 총합 구간 정규분포, 5개 색상 대역별 점유율, 홀짝 비율 추이 등 다차원 패턴 데이터를 심층 분석합니다.',
    keywords: '로또 분석, 로또 패턴, 로또 합계 구간, 로또 색상 통계, 로또 홀짝 비율, 로또메이트',
    h1: '로또 6/45 심층 패턴 분석 및 다차원 통계 지표',
    body: `
      <h2>1. 합계 구간(Sum Distribution)과 정규분포 곡선</h2>
      <p>당첨 번호 6개 숫자를 모두 더한 합계(Sum)는 최소 21(1+2+3+4+5+6)부터 최대 255(40+41+42+43+44+45)까지 분포할 수 있습니다. 그러나 중심극한정리에 의해 당첨 번호의 합계는 가운데 지점인 <strong>138을 중심으로 종 모양의 정규분포(Bell Curve)</strong>를 그립니다.</p>
      <ul>
        <li><strong>안정 구간 (100 ~ 170)</strong>: 전체 역대 당첨 번호의 약 <strong>80.5%</strong>가 이 구간에 집중됩니다.</li>
        <li><strong>황금 구간 (121 ~ 150)</strong>: 가장 높은 출현 빈도를 자랑하는 핵심 합계 범위입니다.</li>
        <li><strong>극단 구간 (80 미만 또는 190 초과)</strong>: 출현 빈도가 3% 미만으로 극히 희박합니다.</li>
      </ul>

      <h2>2. 번호 색상 대역별 출현 비율</h2>
      <p>로또 공은 번호 대역별로 5가지 고유 색상으로 구분됩니다.</p>
      <ul>
        <li><strong>노란색 (1 ~ 10번)</strong>: 10개 번호 (22.2%)</li>
        <li><strong>파란색 (11 ~ 20번)</strong>: 10개 번호 (22.2%)</li>
        <li><strong>빨간색 (21 ~ 30번)</strong>: 10개 번호 (22.2%)</li>
        <li><strong>회색 (31 ~ 40번)</strong>: 10개 번호 (22.2%)</li>
        <li><strong>초록색 (41 ~ 45번)</strong>: 5개 번호 (11.1%)</li>
      </ul>
      <p>실제 당첨 번호는 보통 3~4가지 이상의 색상이 고루 섞여 나오는 경향이 90% 이상을 차지합니다.</p>

      <h2>3. 홀짝 비율(Odd/Even Ratio) 추이 분석</h2>
      <p>최근 20회차 및 전체 회차의 홀수와 짝수 비율을 분석하면, 3:3 (약 33%) 및 4:2 / 2:4 (약 48%)가 압도적인 비중을 차지합니다. 올홀(6:0) 또는 올짝(0:6)은 각각 1% 내외에 불과하므로, 균형 있는 홀짝 배합이 권장됩니다.</p>
    `
  },
  '/simulation': {
    title: '로또 시뮬레이터 · 가상 수익률 타임머신 및 무한 구매 모의실험 · 로또메이트',
    description: '과거 20년간 내가 고른 번호로 매주 구매했을 때의 실질 가상 수익률과, 1등에 당첨될 때까지의 시간/비용을 몬테카를로 기법으로 모의실험합니다.',
    keywords: '로또 시뮬레이터, 로또 모의실험, 로또 가상 수익률, 로또 확률 체감, 1등 당첨 시뮬레이션, 로또메이트',
    h1: '로또 6/45 가상 시뮬레이터 및 몬테카를로 확률 모의실험',
    body: `
      <h2>1. 로또 시뮬레이터의 개발 목적 및 원리</h2>
      <p>로또메이트의 <strong>로또 시뮬레이터</strong>는 814만분의 1이라는 천문학적인 난이도를 가진 로또 1등 당첨의 확률적 냉혹함과 실질적인 재정적 기대값을 사용자가 직관적으로 체감할 수 있도록 설계된 교육용 모의실험 프로그램입니다.</p>

      <h2>2. 시뮬레이터 2대 핵심 모드 안내</h2>
      <ul>
        <li><strong>🕰️ 로또 타임머신 모드</strong>: 사용자가 지정한 6개 번호로 2002년 로또 1회차부터 최신 회차까지 매주 1게임(1,000원)씩 꾸준히 구매했다고 가정했을 때의 등수별 누적 당첨 횟수, 총 지출액, 총 당첨금 및 순수익률(ROI)을 실제 과거 데이터와 대조하여 즉각 리포트합니다.</li>
        <li><strong>🚀 1등 될 때까지 무한 구매 모드</strong>: 고성능 몬테카를로 난수 알고리즘을 통해 초당 수만 게임의 가상 추첨을 실시간 반복하여, 사용자의 번호가 실제로 1등에 당첨되는 순간까지 걸리는 가상 경과 시간(연/주), 대물림 세대수 및 누적 지출 비용을 시각화합니다.</li>
      </ul>

      <h2>3. 통계적 기대값(EV)과 건전한 결론</h2>
      <p>복권 및 복권기금법에 따라 로또 판매 대금의 50%는 복권기금 및 사업비로 공제되고 나머지 50%만 당첨금으로 환원됩니다. 따라서 로또의 장기적인 <strong>수학적 기대값은 -50%</strong>입니다. 시뮬레이션을 통해 장기적인 다량 구매가 반드시 손실로 귀결됨을 인지하고, 소액으로 일주일의 즐거움을 누리는 건전한 이용을 권장합니다.</p>
    `
  },
  '/fortune': {
    title: '오늘의 무료 로또 운세 · 타로 로또 & 꿈해몽 번호 & 별자리 추천 · 로또메이트',
    description: '타로 카드 메이저 아르카나 조합, 전통 동양 꿈해몽 키워드 대조, 12개 별자리 운세를 바탕으로 나만의 행운의 로또 번호 6자리를 추천합니다.',
    keywords: '로또 운세, 타로 로또, 꿈해몽 로또 번호, 별자리 로또, 무료 로또 번호 추천, 행운의 번호, 로또메이트',
    h1: '오늘의 무료 로또 운세 · 타로, 꿈해몽 및 별자리 행운 번호 매칭',
    body: `
      <h2>1. 로또 운세 및 엔터테인먼트 추천 시스템</h2>
      <p>로또메이트의 <strong>로또 운세 코너</strong>는 복권 구매를 하나의 흥미진진한 문화 콘텐츠로 즐기실 수 있도록 타로 점술, 전통 꿈해몽 사전, 점성술 별자리 데이터를 결합하여 독창적인 행운 번호 조합을 추출해 드립니다.</p>

      <h2>2. 3가지 운세 추천 세부 안내</h2>
      <ul>
        <li><strong>🔮 타로 로또 (Tarot Lotto)</strong>: 광대, 마법사, 여황제, 운명의 수레바퀴 등 10장의 메이저 아르카나 카드 덱 중 마음에 이끌리는 3장을 선택하면, 선택된 카드의 기운과 시드 해시를 연산하여 나만의 6자리 조합을 생성하고 결과 인증서를 발급합니다.</li>
        <li><strong>💭 전통 꿈해몽 번호 (Dream Interpretation)</strong>: 돼지(8, 18, 28), 똥(5, 15, 25), 조상님(1, 7, 19), 뱀(3, 13, 23), 불(2, 4, 15), 물(1, 10, 21) 등 전통적으로 재물운을 상징하는 꿈 키워드를 검색하여 매칭 번호를 추천받습니다.</li>
        <li><strong>⭐ 12 별자리 행운 번호 (Zodiac Signs)</strong>: 물병자리부터 염소자리까지 각 별자리의 우주적 위치와 주간 금전운 주기에 따른 맞춤형 행운 번호를 산출합니다.</li>
      </ul>

      <h2>3. 이용 시 유의사항</h2>
      <p>본 운세 추천 서비스는 오락과 재미를 위해 제공되는 콘텐츠이며, 특정 번호의 당첨을 수학적으로 보장하지 않습니다. 가벼운 마음으로 행운의 기운을 확인하는 용도로 활용해 주시기 바랍니다.</p>
    `
  },
  '/guide': {
    title: '로또 실수령액 계산기 및 1등 당첨금 세금·수령 가이드 · 로또메이트',
    description: '로또 당첨금 구간별 소득세·주민세 세금 계산법, 농협은행 본점 방문 준비물, 당첨금 청구 기한 및 수령 절차 전반을 완벽 정리한 가이드입니다.',
    keywords: '로또 실수령액 계산기, 로또 세금, 로또 1등 수령법, 농협은행 본점, 로또 지급 기한, 로또 가이드, 로또메이트',
    h1: '로또 당첨금 실수령액 계산기 및 세무·수령 완벽 가이드',
    body: `
      <h2>1. 로또 당첨금 세금 구조 및 구간별 세율</h2>
      <p>대한민국 소득세법상 복권 당첨금은 <strong>기타소득</strong>으로 분류되어 지급 시 원천징수됩니다. 2023년 세법 개정으로 비과세 기준이 대폭 상향되었습니다.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 0.95rem;">
        <thead>
          <tr style="background: #f0f0f0; border-bottom: 2px solid #ccc;">
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">당첨금 구간</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">소득세</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">지방소득세(주민세)</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">총 적용 세율</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>200만 원 이하 (4·5등, 일부 3등)</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">0%</td>
            <td style="padding: 10px; border: 1px solid #ddd;">0%</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>비과세 (0%)</strong></td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>200만 원 초과 ~ 3억 원 이하 (2·3등)</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">20%</td>
            <td style="padding: 10px; border: 1px solid #ddd;">2%</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>22%</strong></td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>3억 원 초과분 (대부분의 1등)</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">30%</td>
            <td style="padding: 10px; border: 1px solid #ddd;">3%</td>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>33%</strong></td>
          </tr>
        </tbody>
      </table>

      <h2>2. 1등 당첨금 20억 원 기준 실수령액 계산 예시</h2>
      <p>세금은 전체 금액에 33%를 일괄 적용하는 것이 아니라, 3억 원 이하 구간과 3억 원 초과 구간으로 분할하여 계산합니다.</p>
      <ul>
        <li>3억 원 이하 구간 세금 (22%): 300,000,000 × 0.22 = <strong>6,600만 원</strong></li>
        <li>3억 원 초과분(17억 원) 세금 (33%): 1,700,000,000 × 0.33 = <strong>5억 6,100만 원</strong></li>
        <li>총 납부 세금: 6,600만 원 + 5억 6,100만 원 = <strong>6억 2,700만 원</strong></li>
        <li><strong>최종 실수령액</strong>: 20억 원 - 6억 2,700만 원 = <strong>13억 7,300만 원 (약 68.65%)</strong></li>
      </ul>

      <h2>3. 등수별 당첨금 수령 장소 및 준비물</h2>
      <ul>
        <li><strong>1등 당첨자</strong>: <strong>NH농협은행 본점 (서울 중구 서대문역 인근)</strong> 방문 필수. 지역 농·축협 및 일반 지점 수령 불가. (준비물: 당첨복권 실물, 신분증)</li>
        <li><strong>2등 및 3등</strong>: 전국 <strong>NH농협은행 각 지점</strong> 어디서나 수령 가능. (준비물: 당첨복권 실물, 신분증)</li>
        <li><strong>4등 및 5등</strong>: 전국 <strong>일반 로또 판매점</strong> 또는 농협은행 지점에서 현금 및 새 복권으로 교환. (신분증 불요)</li>
        <li><strong>인터넷 구매 복권</strong>: 4·5등은 예치금 계좌로 자동 입금, 고액 당첨은 본인 확인증 출력 후 농협 방문.</li>
      </ul>

      <h2>4. 당첨금 지급 기한 및 복권 보관 주의사항</h2>
      <p>당첨금 지급 청구 기한은 <strong>해당 회차 지급 개시일로부터 1년(365일)</strong>입니다. 기한 내에 찾아가지 않은 미수령 당첨금은 전액 복권기금으로 귀속되어 공익 사업에 사용됩니다. 당첨 복권 뒷면에 미리 성명과 주민등록번호를 기재해 두시면 분실 시 법적 소유권 주장에 결정적인 도움이 됩니다.</p>
    `
  },
  '/about': {
    title: '로또메이트 소개 · 서비스 철학, 데이터 출처 및 건전 이용 강령',
    description: '로또메이트(LottoMate)의 설립 취지, 동행복권 공공데이터 연동 구조, 확률 철학 및 소액 이용을 권장하는 건전 복권 행동 강령을 안내합니다.',
    keywords: '로또메이트 소개, 서비스 철학, 동행복권 데이터, 복권 행동 강령, 건전한 복권, 로또메이트',
    h1: '로또메이트(LottoMate) 소개 · 투명한 데이터와 건전한 복권 문화',
    body: `
      <h2>1. 우리의 설립 취지와 철학 (Philosophy)</h2>
      <p>로또메이트는 대한민국 복권 이용자분들께 과학적이고 투명한 통계 데이터와 공정한 분석 도구를 무료로 제공하기 위해 설립된 독립 웹 플랫폼입니다.</p>
      <p>우리는 "로또 1등을 100% 예측할 수 있다"는 시중의 유료 사기 업체들의 허위 광고에 단호히 반대합니다. 로또 추첨은 완전한 <strong>수학적 독립 시행</strong>이며 미래 번호를 확정적으로 맞추는 기법은 수학적으로 존재하지 않습니다. 로또메이트는 번호 선택의 재미를 극대화하고, 냉정한 확률을 정확히 인지하여 <strong>복권을 건전하고 유쾌한 오락</strong>으로 즐길 수 있도록 돕는 것을 핵심 사명으로 삼습니다.</p>

      <h2>2. 데이터 출처 및 연동 시스템</h2>
      <p>로또메이트에서 제공하는 모든 역대 당첨 번호, 등수별 당첨금, 판매점 통계는 대한민국 정부 공인 수탁사업자인 <strong><a href="https://www.dhlottery.co.kr" target="_blank" rel="noopener noreferrer" style="color: #17653a; text-decoration: underline;">동행복권(dhlottery.co.kr)</a></strong>의 공공데이터 포털 API 및 공식 발표 자료에 기반하여 매주 토요일 추첨 직후 신속하고 정확하게 검증 및 업데이트됩니다.</p>

      <h2>3. 건전한 복권 구매를 위한 4대 행동 수칙</h2>
      <ul>
        <li><strong>소액 구매 원칙</strong>: 복권 구매 비용은 주당 1만 원(10게임) 이하로 유지하세요.</li>
        <li><strong>오락성 인지</strong>: 복권은 '투자'나 '재테크' 수단이 아닌 '한 주의 작은 설렘을 사는 오락'입니다.</li>
        <li><strong>무리한 추격 매수 금지</strong>: 낙첨되었다고 해서 다음 회차에 금액을 늘리는 도박성 베팅을 지양하세요.</li>
        <li><strong>도움 요청</strong>: 복권 몰입으로 일상이나 재정에 어려움이 생길 경우 한국도박문제예방치유원(국번없이 1336)의 전문 상담을 받으시기 바랍니다.</li>
      </ul>

      <h2>4. 문의 및 피드백 (Contact Us)</h2>
      <p>서비스 기능 제안, 데이터 표기 오류 제보, 제휴 문의는 공식 이메일(<a href="mailto:superman612@kakao.com" style="color: #17653a; font-weight: bold;">superman612@kakao.com</a>)로 연락 주시면 신속히 답변해 드리겠습니다.</p>
    `
  },
  '/blog': {
    title: '로또메이트 전문 정보 블로그 · 로또 통계·세무·확률 심층 리포트',
    description: '로또 6/45의 수학적 확률, 세금 계산법, 연금복권 비교, 해외 파워볼 분석 및 자산 관리 가이드를 다루는 로또메이트 전문 아티클 목록입니다.',
    keywords: '로또 블로그, 로또 정보, 로또 세금, 로또 통계, 연금복권 비교, 로또 수령 가이드, 로또메이트',
    h1: '로또메이트 전문 정보 블로그 아티클 라이브러리',
    body: `
      <h2>로또메이트 전문 분석 필진의 심층 아티클 시리즈</h2>
      <p>로또메이트 블로그는 복권의 수학적 확률론, 세법에 따른 실수령액 계산, 해외 복권과의 구조적 비교, 당첨 후 자산 관리 수칙 등 깊이 있고 신뢰할 수 있는 전문 콘텐츠를 연재합니다.</p>
      <ul>
        <li><strong>로또 당첨금 세금 계산 방법과 실수령액 늘리는 법</strong>: 22%~33% 세율 구간 분할 계산법 및 증여세 절세 팁.</li>
        <li><strong>역대 로또 당첨 번호 패턴 및 최다 출현 숫자 분석</strong>: 1회부터 누적된 빈출수 및 홀짝·총합 통계.</li>
        <li><strong>로또 명당의 수학적 진실</strong>: 판매량과 당첨자 수의 비례 관계 및 확률적 실체.</li>
        <li><strong>814만분의 1이 의미하는 수학적 진실</strong>: 조합 공식 해설 및 실생활 확률 비유.</li>
        <li><strong>1등 당첨금 수령 방법 가이드</strong>: 농협은행 본점 방문 동선 및 준비물 체크리스트.</li>
        <li><strong>연금복권 720+ vs 로또 6/45 비교</strong>: 당첨 확률(500만 vs 814만) 및 실질 현금 흐름 가치.</li>
        <li><strong>동행복권 온라인 인터넷 구매 가이드</strong>: PC 예치금 충전 및 자동 당첨금 수령법.</li>
        <li><strong>미국 파워볼·메가밀리언 vs 한국 로또</strong>: 천문학적 이월 상금과 3억분의 1 확률 구조.</li>
        <li><strong>로또 1등 당첨자의 자산 관리 5대 원칙</strong>: 6개월 냉각기 및 포트폴리오 3분할 전략.</li>
        <li><strong>연속 번호(연번) 출현 통계의 진실</strong>: 53%에 달하는 연번 포함 수학적 확률.</li>
        <li><strong>로또 끝수 및 번호대별 균형 배치 전략</strong>: 극단적 편중을 방지하는 조합 필터링.</li>
        <li><strong>복권기금의 배분과 공익 사업</strong>: 1,000원 중 420원이 취약계층 복지에 쓰이는 구조.</li>
        <li><strong>로또 2등 당첨 구조와 보너스 번호의 역학</strong>: 135만분의 1 확률과 3등과의 당첨금 격차.</li>
        <li><strong>로또 QR코드 진위 확인 및 훼손 복권 구제 기준</strong>: 1/2 보존 시 당첨금 청구 요령.</li>
        <li><strong>몬테카를로 시뮬레이션으로 검증한 기대 수익률</strong>: 1억 회 가상 실험과 -50% 기대값.</li>
      </ul>
    `
  },
  '/results': {
    title: '로또 당첨 번호 조회 및 역대 회차별 당첨 결과 · 로또메이트',
    description: '매주 토요일 동행복권 로또 6/45 실시간 당첨 번호 조회, 1등~5등 당첨금 및 당첨자 수, 보너스 번호 대조 결과를 즉시 확인하세요.',
    keywords: '로또 당첨 번호 조회, 로또 역대 결과, 로또 당첨금, 로또 회차별 당첨 번호, 로또메이트',
    h1: '로또 6/45 당첨 번호 조회 및 역대 회차별 당첨 결과 검색',
    body: `
      <h2>1. 최신 로또 6/45 당첨 결과 및 등수별 당첨금 기준</h2>
      <p>매주 토요일 오후 8시 35분경 MBC 추첨 방송을 통해 결정되는 동행복권 로또 6/45의 최신 당첨 번호와 보너스 번호, 등수별 당첨금 정보입니다.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 0.95rem;">
        <thead>
          <tr style="background: #f0f0f0; border-bottom: 2px solid #ccc;">
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">등수</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">당첨 조건</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">평균 당첨금</th>
            <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">당첨 확률</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>1등</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">당첨 번호 6개 일치</td>
            <td style="padding: 10px; border: 1px solid #ddd;">약 15억 ~ 30억 원</td>
            <td style="padding: 10px; border: 1px solid #ddd;">1 / 8,145,060</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>2등</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">당첨 번호 5개 + 보너스 번호 일치</td>
            <td style="padding: 10px; border: 1px solid #ddd;">약 4,000만 ~ 6,000만 원</td>
            <td style="padding: 10px; border: 1px solid #ddd;">1 / 1,357,510</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>3등</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">당첨 번호 5개 일치</td>
            <td style="padding: 10px; border: 1px solid #ddd;">약 120만 ~ 160만 원</td>
            <td style="padding: 10px; border: 1px solid #ddd;">1 / 35,724</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>4등</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">당첨 번호 4개 일치</td>
            <td style="padding: 10px; border: 1px solid #ddd;">고정 50,000원 (비과세)</td>
            <td style="padding: 10px; border: 1px solid #ddd;">1 / 733</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>5등</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">당첨 번호 3개 일치</td>
            <td style="padding: 10px; border: 1px solid #ddd;">고정 5,000원 (비과세)</td>
            <td style="padding: 10px; border: 1px solid #ddd;">1 / 45</td>
          </tr>
        </tbody>
      </table>

      <h2>2. 회차별 당첨 번호 검색 및 번호 대조</h2>
      <p>원하시는 회차 번호를 입력하여 역대 모든 회차의 당첨 번호를 조회하고, 내가 구매한 번호 6개를 입력하여 즉시 일치 개수와 당첨 등수를 확인할 수 있습니다.</p>
    `
  },
  '/compare': {
    title: '로또 번호 당첨 결과 대조기 · 내 번호 당첨 확인 · 로또메이트',
    description: '선택한 회차의 1등 당첨 번호 및 보너스 번호와 나의 번호를 대조하여 당첨 등수와 일치 번호를 한눈에 확인합니다.',
    keywords: '로또 번호 대조, 로또 당첨 확인, 로또 번호 맞추기, 로또메이트',
    h1: '로또 6/45 회차별 당첨 번호 대조 및 등수 판정',
    body: `
      <h2>1. 회차별 로또 당첨 번호 대조 시스템</h2>
      <p>로또메이트의 번호 대조기는 각 회차별 공식 당첨 번호(6개 기본 번호 + 1개 보너스 번호)를 선명한 볼 그래픽으로 시각화하여 사용자가 자신의 복권 영수증과 편리하게 대조할 수 있도록 지원합니다.</p>

      <h2>2. 당첨 판정 기준 안내</h2>
      <ul>
        <li><strong>1등</strong>: 기본 번호 6개 모두 일치</li>
        <li><strong>2등</strong>: 기본 번호 5개 일치 + 보너스 번호 일치</li>
        <li><strong>3등</strong>: 기본 번호 5개 일치</li>
        <li><strong>4등</strong>: 기본 번호 4개 일치 (당첨금 5만 원)</li>
        <li><strong>5등</strong>: 기본 번호 3개 일치 (당첨금 5천 원)</li>
      </ul>
      <p>실물 복권의 당첨 여부는 동행복권 공식 QR코드 스캔 또는 판매점 단말기를 통해 최종 재확인하시기 바랍니다.</p>
    `
  },
  '/saved': {
    title: '저장된 로또 번호 목록 및 관리 · 로또메이트',
    description: '로또메이트에서 생성하여 보관함에 저장한 나만의 번호 조합 목록입니다. 안전하게 기기 내 로컬 브라우저에 저장됩니다.',
    keywords: '로또 번호 저장, 로또 관리, 저장된 번호, 로또메이트',
    h1: '저장된 나만의 로또 번호 조합 목록',
    body: `
      <h2>1. 저장된 번호 관리 및 로컬 스토리지 보안</h2>
      <p>로또메이트에서 번호 생성 후 저장한 조합들은 사용자의 개인정보 보호를 위해 서버로 전송되지 않고 오직 <strong>사용자 브라우저의 안전한 로컬 스토리지(Local Storage)</strong>에만 보관됩니다.</p>
      <p>브라우저를 닫거나 재방문하더라도 언제든 저장된 번호를 불러와 지난 회차 결과와 대조하거나 이미지로 다운로드하여 복권 구매 시 활용하실 수 있습니다.</p>
    `
  },
  '/privacy': {
    title: '개인정보처리방침 · 로또메이트',
    description: '로또메이트의 개인정보처리방침입니다. 회원가입 없는 비로그인 서비스 운영, 로컬 스토리지 사용 및 구글 애드센스 쿠키 정책을 투명하게 공개합니다.',
    keywords: '개인정보처리방침, 개인정보 보호, 로또메이트 약관, 애드센스 쿠키 정책',
    h1: '로또메이트 개인정보처리방침',
    body: `
      <h2>1. 개인정보 수집 및 처리 원칙</h2>
      <p>로또메이트(이하 "서비스")는 이용자의 개인정보를 소중히 여기며, 개인정보 보호법 등 관련 법령을 엄격히 준수합니다. 본 서비스는 별도의 회원가입 절차 없이 비로그인 방식으로 전 기능을 무료 제공하므로, 이용자의 성명, 전화번호, 주민등록번호 등 민감한 개인 식별 정보를 서버에 일절 수집하거나 저장하지 않습니다.</p>

      <h2>2. 브라우저 로컬 스토리지(Local Storage) 활용</h2>
      <p>이용자가 직접 생성하고 저장한 번호 목록 및 테마 설정(다크모드 등)은 이용자 본인의 단말기 내부 브라우저 로컬 스토리지에만 저장됩니다. 이 데이터는 외부 서버로 전송되지 않으며, 브라우저 캐시 삭제 시 언제든 초기화할 수 있습니다.</p>

      <h2>3. Google AdSense 및 제3자 광고 쿠키 정책</h2>
      <p>본 사이트는 광고 게재를 위해 Google AdSense를 이용하며, 구글 및 제3자 광고 사업자는 쿠키(Cookie)를 활용하여 이용자의 사이트 방문 기록을 기반으로 맞춤형 광고를 제공할 수 있습니다.</p>
      <ul>
        <li>Google은 광고 쿠키를 사용하여 본 사이트 및 인터넷의 다른 사이트 방문 기록을 바탕으로 관련성 높은 광고를 게재합니다.</li>
        <li>이용자는 구글의 <a href="https://adssettings.google.com" target="_blank" rel="noopener">광고 설정(Ads Settings)</a>을 방문하여 맞춤형 광고를 거부(Opt-out)할 수 있습니다.</li>
        <li>또한 <a href="https://optout.aboutads.info" target="_blank" rel="noopener">www.aboutads.info</a>를 통해 타사 공급업체의 맞춤형 광고 쿠키 사용을 전면 차단할 수 있습니다.</li>
      </ul>

      <h2>4. 웹로그 분석 도구 (Google Analytics)</h2>
      <p>서비스 품질 향상 및 트래픽 분석을 위해 Google Analytics를 사용하며, 비개인 식별 데이터(방문 국가, 브라우저 환경, 페이지뷰 등)만을 익명 처리하여 집계합니다.</p>

      <h2>5. 개인정보보호 문의처</h2>
      <p>개인정보 처리 및 정책에 관한 문의 사항은 <a href="mailto:superman612@kakao.com">superman612@kakao.com</a>으로 연락 주시기 바랍니다.</p>
    `
  },
  '/terms': {
    title: '이용약관 및 법적 면책 조항 · 로또메이트',
    description: '로또메이트 서비스의 이용 조건, 당첨 보장 불가에 대한 법적 면책 조항 및 이용자의 권리·의무를 고지합니다.',
    keywords: '이용약관, 면책 조항, 로또메이트 약관, 법적 고지',
    h1: '로또메이트 서비스 이용약관 및 법적 면책 조항',
    body: `
      <h2>1. 서비스의 목적 및 범위</h2>
      <p>본 약관은 로또메이트(이하 "서비스")가 제공하는 로또 번호 생성, 통계 분석, 가상 시뮬레이션, 운세 매칭 및 관련 정보 서비스의 이용 조건과 권리·의무 사항을 규정합니다. 본 서비스는 개인 개발자가 정보 제공 및 오락 목적으로 운영하는 무료 웹 서비스입니다.</p>

      <h2>2. 당첨 보장 불가 및 법적 면책 조항 (중요)</h2>
      <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px 16px; margin: 16px 0;">
        <strong>면책 고지</strong>: 본 서비스에서 제공하는 모든 번호 생성 알고리즘, 통계 분석 수치 및 시뮬레이션 결과는 수학적 확률과 무작위 난수 연산에 기반한 참고용 자료일 뿐이며, <strong>실제 복권의 당첨을 절대 보장하지 않습니다.</strong>
      </div>
      <p>대한민국 로또 6/45의 모든 추첨은 독립 시행이므로 어떠한 기법으로도 미래의 당첨 번호를 예측할 수 없습니다. 서비스의 데이터를 기반으로 한 복권 구매 결정 및 그에 따른 모든 재정적 손실과 결과는 전적으로 이용자 본인에게 귀속되며, 서비스 운영자는 이에 대한 민·형사상 법적 책임을 일절 지지 않습니다.</p>

      <h2>3. 이용자의 준수 사항</h2>
      <ul>
        <li>이용자는 본 서비스를 개인적, 비상업적 용도로만 이용해야 합니다.</li>
        <li>시스템에 과도한 부하를 유발하는 무단 대량 크롤링, 해킹 시도, 역공학(Reverse Engineering) 행위를 엄격히 금지합니다.</li>
      </ul>

      <h2>4. 약관의 효력 및 개정</h2>
      <p>본 약관은 웹사이트에 공시함으로써 효력이 발생하며, 관련 법령을 위배하지 않는 범위 내에서 사전 공지 후 개정될 수 있습니다.</p>
    `
  }
};

// 3. 마크다운을 완벽한 시맨틱 HTML로 변환하는 정밀 파서
function mdToHtml(md) {
  let text = md;

  // 1. 헤더 변환 (#### -> <h4>, ### -> <h3>, ## -> <h2>, # -> <h1>)
  text = text.replace(/^#### (.*?)$/gm, '<h4 style="color: #512da8; font-size: 1.2rem; margin-top: 24px; margin-bottom: 8px;">$1</h4>');
  text = text.replace(/^### (.*?)$/gm, '<h3 style="color: #17653a; font-size: 1.4rem; border-left: 4px solid #17653a; padding-left: 10px; margin-top: 28px; margin-bottom: 12px;">$1</h3>');
  text = text.replace(/^## (.*?)$/gm, '<h2 style="color: #311b92; font-size: 1.6rem; margin-top: 32px; margin-bottom: 16px;">$1</h2>');
  text = text.replace(/^# (.*?)$/gm, '<h1 style="color: #17653a; font-size: 1.8rem; margin-top: 36px; margin-bottom: 16px;">$1</h1>');

  // 2. 인라인 볼드 **text**
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // 3. 인라인 코드 및 수식 $formula$ -> <code>formula</code>
  text = text.replace(/\$(.*?)\$/g, '<code style="background: #ede7f6; color: #4a148c; padding: 2px 6px; border-radius: 4px; font-weight: bold;">$1</code>');

  // 4. 링크 [text](url)
  text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color: #17653a; text-decoration: underline;">$1</a>');

  // 5. 블록 분할 및 리스트 / 문단 파싱
  const rawBlocks = text.split(/\n\s*\n/);
  const parsedBlocks = rawBlocks.map(block => {
    block = block.trim();
    if (!block) return '';

    // 이미 h 태그인 경우
    if (block.startsWith('<h1') || block.startsWith('<h2') || block.startsWith('<h3') || block.startsWith('<h4')) {
      return block;
    }

    // Unordered list (- or *)
    const lines = block.split('\n');
    const isUnordered = lines.every(l => l.trim().startsWith('- ') || l.trim().startsWith('* '));
    if (isUnordered) {
      const items = lines.map(l => {
        const itemContent = l.trim().replace(/^[-*]\s+/, '');
        return `<li style="margin-bottom: 6px; line-height: 1.7;">${itemContent}</li>`;
      }).join('\n');
      return `<ul style="padding-left: 24px; margin-bottom: 16px;">\n${items}\n</ul>`;
    }

    // Ordered list (1. 2. 3.)
    const isOrdered = lines.every(l => /^\d+\.\s+/.test(l.trim()));
    if (isOrdered) {
      const items = lines.map(l => {
        const itemContent = l.trim().replace(/^\d+\.\s+/, '');
        return `<li style="margin-bottom: 6px; line-height: 1.7;">${itemContent}</li>`;
      }).join('\n');
      return `<ol style="padding-left: 24px; margin-bottom: 16px;">\n${items}\n</ol>`;
    }

    // 일반 문단 (내부 줄바꿈 처리)
    const formattedParagraph = lines.join('<br />');
    return `<p style="margin-bottom: 16px; line-height: 1.8; text-align: justify;">${formattedParagraph}</p>`;
  });

  return parsedBlocks.join('\n');
}

// 4. HTML 파일 주입 처리 함수
function processRoute(routePath, seoData, customJsonLd = null) {
  let relativeFilePath = routePath === '/' ? 'index.html' : path.join(routePath.substring(1), 'index.html');
  const fullFilePath = path.join(__dirname, '../dist', relativeFilePath);

  if (!fs.existsSync(fullFilePath)) {
    // 디렉토리가 없으면 생성 후 index.html 템플릿 복사
    fs.mkdirSync(path.dirname(fullFilePath), { recursive: true });
    const rootIndex = path.join(__dirname, '../dist/index.html');
    if (fs.existsSync(rootIndex)) {
      fs.copyFileSync(rootIndex, fullFilePath);
    } else {
      return;
    }
  }

  let html = fs.readFileSync(fullFilePath, 'utf8');

  // Title 태그 교체
  html = html.replace(/<title>.*?<\/title>/, `<title>${seoData.title}</title>`);

  // Description 태그 교체
  const descTag = `<meta name="description" content="${seoData.description}">`;
  const ogDescTag = `<meta property="og:description" content="${seoData.description}">`;
  const twDescTag = `<meta name="twitter:description" content="${seoData.description}">`;
  html = html.replace(/<meta name="description" content=".*?">/, descTag);
  html = html.replace(/<meta property="og:description" content=".*?">/, ogDescTag);
  html = html.replace(/<meta name="twitter:description" content=".*?">/, twDescTag);

  // Keywords 태그 교체
  const keyTag = `<meta name="keywords" content="${seoData.keywords}">`;
  html = html.replace(/<meta name="keywords" content=".*?">/, keyTag);

  // Canonical & OG URL
  const canonicalUrl = `https://lottomate.life${routePath === '/' ? '/' : (routePath.endsWith('/') ? routePath : routePath + '/')}`;
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}">`;
  const ogUrlTag = `<meta property="og:url" content="${canonicalUrl}">`;
  html = html.replace(/<link rel="canonical" href=".*?">/, canonicalTag);
  html = html.replace(/<meta property="og:url" content=".*?">/, ogUrlTag);

  // OG Title & Twitter Title
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

  if (!html.includes('hreflang="ko"')) {
    html = html.replace('</head>', `  ${hreflangTags}\n</head>`);
  }

  // JSON-LD 주입
  if (customJsonLd && !html.includes('id="seo-blogposting-schema"')) {
    const jsonLdScript = `<script id="seo-blogposting-schema" type="application/ld+json">${JSON.stringify(customJsonLd)}</script>`;
    html = html.replace('</head>', `  ${jsonLdScript}\n</head>`);
  }

  // pre-rendered SEO 본문 구성
  const appBody = `
    <div class="pre-rendered-seo-body" style="display: block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 840px; margin: 40px auto; padding: 0 24px; text-align: left; line-height: 1.8; color: #212121;">
      <h1 style="color: #17653a; font-size: 2.2rem; border-bottom: 2px solid #E0E0E0; padding-bottom: 12px; margin-bottom: 24px;">${seoData.h1}</h1>
      <div class="content-body" style="font-size: 1.05rem; margin-top: 20px;">
        ${seoData.body}
      </div>
      <hr style="margin: 40px 0; border: 0; border-top: 1px solid #E0E0E0;" />
      <footer style="font-size: 0.9rem; color: #757575;">
        <p>© 2026 로또메이트 (LottoMate). 본 정보는 통계 보조 데이터이며 건전한 소액 복권 이용을 장려합니다.</p>
        <p>문의: <a href="mailto:superman612@kakao.com" style="color: #17653a; text-decoration: none;">superman612@kakao.com</a> | <a href="/privacy" style="color: #17653a; text-decoration: none;">개인정보처리방침</a> | <a href="/terms" style="color: #17653a; text-decoration: none;">이용약관</a> | <a href="https://www.dhlottery.co.kr" target="_blank" rel="noopener noreferrer" style="color: #17653a; text-decoration: none;">동행복권 공식사이트 ↗</a></p>
      </footer>
    </div>
  `;

  // <div id="app"> 내부의 텍스트가 얇거나 비어있는 경우 정적 SEO 본문 주입
  if (html.includes('<div id="app"></div>')) {
    html = html.replace('<div id="app"></div>', `<div id="app">${appBody}</div>`);
  } else if (html.includes('<div class="pre-rendered-seo-body"')) {
    // 이미 존재하는 이전 pre-rendered 바디를 신규 버전으로 교체
    html = html.replace(/<div class="pre-rendered-seo-body"[\s\S]*?<\/footer>\s*<\/div>/, appBody.trim());
  }

  fs.writeFileSync(fullFilePath, html, 'utf8');
  console.log(`[post-build-seo] 정적 주입 완료: ${relativeFilePath}`);
}

// 5. 메인 실행 절차
console.log('[post-build-seo] 정적 파일 대상 종합 SEO 주입 스크립트 실행 시작...');

// 5-1. 정적 메인 페이지 주입
Object.keys(staticSeoConfig).forEach((routePath) => {
  const seoData = staticSeoConfig[routePath];
  processRoute(routePath, seoData);
});

// 5-2. 블로그 15개 전문 아티클 주입
blogPosts.forEach((post) => {
  const routePath = `/blog/${post.id}`;
  const title = `${post.title} · 로또메이트 블로그`;
  const description = post.summary;
  const keywords = `로또 분석, ${post.title.substring(0, 15)}, 로또 세금, 로또 통계, 로또메이트`;
  const h1 = post.title;
  const bodyHtml = `
    <div style="font-size: 0.95rem; color: #757575; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 8px;">
      <span>📅 발행일: ${post.date.substring(0, 10)}</span> | <span>✍️ 작성자: ${post.author}</span>
    </div>
    ${mdToHtml(post.content)}
    <div class="eeat-bio-card" style="background: #fbf9ff; border: 1px solid #d1c4e9; padding: 20px; border-radius: 8px; margin-top: 40px; display: flex; align-items: center;">
      <div style="font-size: 2.2rem; margin-right: 16px;">📊</div>
      <div>
        <strong style="color: #17653a; font-size: 1.1rem;">${post.author} (LottoMate 리서치팀)</strong>
        <p style="margin: 4px 0 0 0; font-size: 0.9rem; color: #555; line-height: 1.5;">
          로또메이트 전문 분석 필진으로, 복권 확률 모델 연구, 세무/금융 가이드 작성 및 건전한 게임 이용에 관한 전문 정보를 제공합니다.
        </p>
      </div>
    </div>
  `;

  const canonicalUrl = `https://lottomate.life/blog/${post.id}/`;
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

// 5-3. 최신 5개 회차 상세 결과 및 비교 페이지 정적 주입
const sortedLotto = [...lottoData].sort((a, b) => b.round - a.round);
const recent5Rounds = sortedLotto.slice(0, 5);

recent5Rounds.forEach((r) => {
  const nums = [r.num1, r.num2, r.num3, r.num4, r.num5, r.num6].sort((a, b) => a - b);
  const sum = nums.reduce((a, b) => a + b, 0);
  const oddCount = nums.filter(n => n % 2 !== 0).length;
  const evenCount = 6 - oddCount;

  // Results 라우트
  const resultsPath = `/results/${r.round}`;
  const resultsTitle = `제 ${r.round}회 로또 6/45 당첨 번호 및 등수별 결과 · 로또메이트`;
  const resultsDesc = `제 ${r.round}회 로또 6/45 당첨 번호: [${nums.join(', ')}] + 보너스 [${r.bonus}], 추첨일: ${r.draw_date}. 등수별 당첨금 및 통계 요약을 확인하세요.`;
  const resultsBody = `
    <h2>제 ${r.round}회 공식 추첨 결과 (${r.draw_date} 추첨)</h2>
    <div style="background: #f5f0ff; border: 1px solid #d1c4e9; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
      <div style="font-size: 1.4rem; font-weight: bold; color: #17653a; margin-bottom: 12px;">
        당첨 번호: <span style="letter-spacing: 4px;">${nums.join('  ')}</span> + 보너스 <span style="color: #ff6f00;">${r.bonus}</span>
      </div>
      <div style="font-size: 0.95rem; color: #555;">
        총합: <strong>${sum}</strong> | 홀짝 비율: <strong>홀수 ${oddCount} : 짝수 ${evenCount}</strong> | 추첨일: <strong>${r.draw_date}</strong>
      </div>
    </div>
    <h3>등수별 당첨 기준 안내</h3>
    <ul>
      <li><strong>1등 (6개 일치)</strong>: [${nums.join(', ')}]</li>
      <li><strong>2등 (5개 일치 + 보너스 ${r.bonus})</strong>: 5개 일치 및 보너스 번호 일치 시 2등 당첨</li>
      <li><strong>3등 (5개 일치)</strong>: 보너스 번호를 제외한 5개 번호 일치</li>
      <li><strong>4등 (4개 일치)</strong>: 고정 당첨금 50,000원 (비과세)</li>
      <li><strong>5등 (3개 일치)</strong>: 고정 당첨금 5,000원 (비과세)</li>
    </ul>
    <p>실제 당첨금 수령은 지급 개시일로부터 1년 이내에 신청하셔야 하며, 1등은 농협은행 본점에서 수령 가능합니다.</p>
  `;
  processRoute(resultsPath, { title: resultsTitle, description: resultsDesc, keywords: `로또 ${r.round}회, 로또 당첨번호, ${r.round}회 로또, 로또메이트`, h1: `제 ${r.round}회 로또 당첨 번호 결과`, body: resultsBody });

  // Compare 라우트
  const comparePath = `/compare/${r.round}`;
  const compareTitle = `제 ${r.round}회 로또 번호 대조 및 당첨 확인 · 로또메이트`;
  const compareDesc = `제 ${r.round}회 로또 당첨 번호 [${nums.join(', ')}] + 보너스 [${r.bonus}]와 내 번호를 손쉽게 대조해 보세요.`;
  const compareBody = `
    <h2>제 ${r.round}회 당첨 번호 대조기</h2>
    <p>제 ${r.round}회 (${r.draw_date} 추첨)의 1등 당첨 번호 <strong>[${nums.join(', ')}]</strong> 및 보너스 번호 <strong>[${r.bonus}]</strong>와 소지하신 복권 번호를 대조할 수 있는 페이지입니다.</p>
    <p>맞춘 개수가 6개면 1등, 5개+보너스면 2등, 5개면 3등, 4개면 4등(5만원), 3개면 5등(5천원)에 해당합니다.</p>
  `;
  processRoute(comparePath, { title: compareTitle, description: compareDesc, keywords: `로또 ${r.round}회 대조, 로또번호확인, 로또메이트`, h1: `제 ${r.round}회 로또 번호 대조`, body: compareBody });
});

console.log('[post-build-seo] 모든 대상 페이지 주입 완료!');

// 6. 사이트맵 자동 생성 및 동기화
console.log('[post-build-seo] sitemap.xml 자동 생성 시작...');
try {
  const urls = [];

  // 1) 정적 메인 페이지
  const staticRoutes = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/results/', changefreq: 'daily', priority: '0.9' },
    { path: '/saved/', changefreq: 'weekly', priority: '0.8' },
    { path: '/compare/', changefreq: 'weekly', priority: '0.8' },
    { path: '/simulation/', changefreq: 'daily', priority: '0.9' },
    { path: '/analysis/', changefreq: 'weekly', priority: '0.7' },
    { path: '/stats/', changefreq: 'monthly', priority: '0.7' },
    { path: '/fortune/', changefreq: 'daily', priority: '0.7' },
    { path: '/guide/', changefreq: 'monthly', priority: '0.8' },
    { path: '/blog/', changefreq: 'daily', priority: '0.9' },
    { path: '/about/', changefreq: 'monthly', priority: '0.7' },
    { path: '/privacy/', changefreq: 'monthly', priority: '0.3' },
    { path: '/terms/', changefreq: 'monthly', priority: '0.3' }
  ];

  staticRoutes.forEach(r => {
    urls.push(`  <url>
    <loc>https://lottomate.life${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`);
  });

  // 2) 블로그 15개 아티클 URL
  blogPosts.forEach(post => {
    urls.push(`  <url>
    <loc>https://lottomate.life/blog/${post.id}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
  });

  // 3) 최신 5개 회차 결과 및 비교 URL
  recent5Rounds.forEach(r => {
    urls.push(`  <url>
    <loc>https://lottomate.life/results/${r.round}/</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`);
    urls.push(`  <url>
    <loc>https://lottomate.life/compare/${r.round}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  const publicSitemapPath = path.join(__dirname, '../public/sitemap.xml');
  const distSitemapPath = path.join(__dirname, '../dist/sitemap.xml');

  fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf8');
  if (fs.existsSync(path.dirname(distSitemapPath))) {
    fs.writeFileSync(distSitemapPath, sitemapXml, 'utf8');
  }
  console.log('[post-build-seo] sitemap.xml 자동 생성 및 업데이트 완료! (총 ' + urls.length + '개 URL)');

} catch (err) {
  console.error('[post-build-seo] sitemap.xml 생성 중 에러 발생:', err);
}
