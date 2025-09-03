# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## 로또 번호 업데이트

공식 API에서 최신 회차를 가져와 로컬 JSON을 갱신합니다.

- 데이터 파일: `src/assets/lotto_numbers_en.json`
- 스크립트: `scripts/update-lotto.mjs`

사용 방법

```bash
# 신규 회차를 조회해 JSON에 반영
npm run update:lotto

# 점검만 수행(파일 미변경)
npm run update:lotto -- --dry-run
```

참고

- 소스: https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=<회차>
- 동작: JSON에서 최대 회차를 찾은 뒤 이후 회차를 조회해 최신순(내림차순)으로 앞쪽에 추가합니다. 2칸 들여쓰기와 마지막 줄 개행을 유지합니다.
- 요구 사항: Node 18+ (ESM + 전역 `fetch` 지원).

자동화(선택)

- CI(GitHub Actions, Netlify 빌드 훅 등)에서 주 1회(예: 토요일 밤) `npm run update:lotto`를 실행해 자동 갱신하도록 설정할 수 있습니다.
