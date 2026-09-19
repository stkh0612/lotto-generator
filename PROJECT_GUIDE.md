# 📌 LottoMate (로또메이트) 프로젝트 개발 & 운영 지침서

> 본 문서는 **LottoMate** 프로젝트를 새로운 환경(다른 PC)에서 이어서 개발하거나, AI 코딩 어시스턴트(Cursor, Claude, Copilot, Antigravity 등)가 작업을 수행할 때 따라야 할 핵심 규칙과 구조를 정리한 가이드라인입니다.

---

## 1. 프로젝트 개요

* **서비스명**: 로또메이트 (LottoMate)
* **서비스 URL**: [https://lottomate.life](https://lottomate.life)
* **주요 기능**:
  * 대한민국 동행복권 로또 6/45 번호 자동 생성 및 통계 필터링
  * 3D 물리 추첨 시뮬레이터 & 타임머신 가상 수익률 모의실험
  * 1회부터 최신 회차까지의 역대 번호 출현 빈도 및 심층 통계 분석
  * 회차별 당첨 번호 실시간 조회 및 내 번호 대조기
  * 타로 카드 / 꿈해몽 / 별자리 기반 행운 번호 매칭
  * 로또 실수령액 계산기 및 세무/수령 가이드
  * 통계·세무 전문 정보 블로그 아티클 제공

---

## 2. 기술 스택 (Tech Stack)

* **Core**: Vue 3 (Composition API / `<script setup>`), TypeScript, Vite
* **State Management**: Pinia
* **Routing**: Vue Router 4 (HTML5 History 모드)
* **UI Framework**: Vuetify 3 (Material Design Icons `@mdi/font`)
* **Data Visualization**: Chart.js, vue-chartjs
* **Internationalization**: Vue I18n (한국어, 영어, 일본어)
* **SEO & SSG**: 자체 Node.js 사후 빌드 스크립트 (`scripts/post-build-seo.cjs`)
* **Hosting**: Netlify (Primary) & GitHub Pages (Backup)
* **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)

---

## 3. 환경 설정 및 주요 명령어

### 3.1 필수 환경
* **Node.js**: `v18.x` ~ `v20.x` 권장
* **npm**: v9 이상

### 3.2 패키지 설치
Vuetify 및 일부 플러그인 의존성 호환을 위해 반드시 `--legacy-peer-deps` 옵션을 사용합니다.
```bash
npm install --legacy-peer-deps
```

### 3.3 실행 및 빌드 명령어
```bash
# 로컬 개발 서버 실행 (기본 포트: 5173 또는 설정된 포트)
npm run dev

# 프로덕션 빌드 (Vite 번들링 + 정적 SEO 본문 주입 + sitemap.xml 갱신)
npm run build

# 빌드 결과물 로컬 미리보기 (포트 5000)
npm run preview

# 로또 최신 당첨 번호 수동 업데이트
npm run update:lotto

# IndexNow(Bing, Naver 등) 검색엔진 즉시 색인 제출
npm run submit:indexnow
```

---

## 4. 디렉터리 구조 및 핵심 파일 역할

```text
lotto-generator/
├── .github/workflows/
│   └── deploy.yml              # 매주 토요일 최신 회차 자동 크롤링, 빌드, 배포 워크플로우
├── public/
│   ├── robots.txt              # 크롤러 수집 허용 규칙
│   ├── sitemap.xml             # 검색 엔진 제출용 사이트맵 (자동 생성/동기화됨)
│   └── ads.txt                 # 구글 애드센스 인증 파일
├── scripts/
│   ├── post-build-seo.cjs      # [핵심] 빌드 후 정적 HTML에 시맨틱 본문/메타 주입 & sitemap 자동 생성
│   ├── update-lotto.mjs        # 동행복권 및 공공데이터 API 연동 최신 회차 수집 스크립트
│   └── submit-indexnow.mjs     # IndexNow API 검색엔진 색인 전송 스크립트
├── src/
│   ├── assets/
│   │   ├── lotto_numbers_en.json # 1회부터 최신 회차까지의 공식 당첨 번호 데이터셋
│   │   └── blog_posts.json       # 블로그 아티클 데이터 (마크다운 본문, 참고문헌, 작성자 등)
│   ├── components/             # 공통 UI 컴포넌트 (AppBar, Sidebar, Footer, Ball 등)
│   ├── locales/                # 다국어 번역 파일 (ko.json, en.json, ja.json)
│   ├── router/                 # Vue Router 라우팅 설정
│   ├── seo/
│   │   └── config.ts           # 라우트별 기본 타이틀, 디스크립션 메타 설정
│   ├── stores/                 # Pinia 전역 상태 저장소
│   └── views/                  # 각 화면 페이지 뷰 (Home, Stats, Blog, Guide 등)
├── netlify.toml                # Netlify 배포 및 404 리다이렉트 설정
└── package.json
```

---

## 5. 핵심 개발 & 운영 원칙 (중요)

### 5.1 토요일 GitHub Actions 자동 커밋 충돌 방지 ⚠️
* GitHub Actions가 **매주 토요일 밤 (KST 20:45, 21:15, 22:00)** 최신 로또 추첨 결과를 자동으로 수집하여 `master` 브랜치에 커밋(`chore: auto-update lotto numbers & sitemap [skip actions]`)하고 푸시합니다.
* **로컬에서 작업을 시작하기 전에는 반드시 원격 변경 사항을 먼저 풀(Pull)해야 합니다:**
  ```bash
  git pull origin master
  ```

### 5.2 SEO & URL 트레일링 슬래시(`/`) 규칙 ⚠️
* Netlify 정적 호스팅은 디렉터리(`dist/stats/index.html`) 방식으로 서빙하므로, **끝에 슬래시가 붙은 URL (`/stats/`, `/analysis/`)이 정규 표준(Canonical) 주소**입니다.
* 슬래시 없는 주소(`/stats`)로 요청이 들어오면 서버에서 `301 Moved Permanently` 리다이렉트를 반환합니다.
* **네이버 서치어드바이저 및 구글 서치 콘솔에 URL을 수집 요청하거나 색인을 등록할 때는 반드시 끝에 `/`를 붙여서 제출**해야 합니다. (예: `https://lottomate.life/stats/`)
* 사이트맵(`sitemap.xml`)과 `post-build-seo.cjs`의 Canonical 태그도 모두 트레일링 슬래시(`/`)를 유지하도록 설계되어 있습니다.

### 5.3 사후 빌드 SEO 주입 스크립트 (`scripts/post-build-seo.cjs`) 원리
* 본 프로젝트는 SPA(Single Page Application)이지만 검색 봇(Googlebot, Naver Yeti, Bingbot)에게 완벽한 본문을 제공하기 위해 빌드 시점에 **정적 시맨틱 본문(HTML)**을 생성하여 각 라우트 폴더의 `index.html`에 직접 주입합니다.
* 새 페이지나 신규 블로그 글을 추가할 경우:
  1. `src/views/` 및 `src/router/`에 컴포넌트 라우트 등록
  2. `scripts/post-build-seo.cjs`의 `staticSeoConfig` 또는 `blog_posts.json`에 메타데이터 및 본문 추가
  3. 빌드(`npm run build`) 시 자동으로 정적 HTML 및 `sitemap.xml`에 반영됨

---

## 6. AI 코딩 어시스턴트 지침 (AI Instructions)

1. **Vue 3 `<script setup lang="ts">` 스타일 유지**:
   * 모든 뷰와 컴포넌트는 Composition API와 TypeScript를 엄격히 적용합니다.
2. **반응형 UI & 모바일 최적화**:
   * 로또 이용자의 대다수는 모바일 사용자입니다. Vuetify 그리드(`v-col`, `v-row`)와 모바일 브라우저(하단 네비게이션, 세이프 에어리어) 렌더링에 세심하게 신경 씁니다.
3. **건전 복권 이용 윤리 준수**:
   * 로또는 '독립 시행'이며 미래 번호 예측이 수학적으로 불가능함을 명시합니다. "당첨 100% 보장" 등의 허위/사기성 문구는 절대 사용하지 않습니다.
4. **번들 크기 최소화**:
   * 새로운 패키지 추가는 신중하게 결정하며, 무거운 외부 의존성 대신 표준 웹 API 및 기존 라이브러리(Vuetify, Chart.js)를 우선 활용합니다.
