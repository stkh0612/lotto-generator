<template>
  <v-container fluid class="py-6">
    <v-sheet class="mx-auto px-6 py-6" max-width="820" elevation="1" rounded>
      <div class="text-h5 font-weight-bold mb-4">{{ $t('guideTitle') }}</div>

      <div class="mb-3">이 서비스는 로또 6/45 번호 생성과 결과 조회를 도와줍니다. 당첨을 보장하지 않으며, 책임 있는 이용을 권장합니다.</div>

      <div class="text-subtitle-1 font-weight-medium mt-6 mb-2">기본 사용법</div>
      <ul class="pl-6" style="line-height:1.7; text-align:left;">
        <li>홈에서 무작위 번호 6개를 생성하고 저장할 수 있습니다(최대 5게임).</li>
        <li>저장한 번호는 저장 탭에서 확인 및 이미지(PNG)로 저장할 수 있습니다.</li>
        <li>결과 조회에서 특정 회차 당첨번호를 API로 불러와 대조할 수 있습니다.</li>
      </ul>

      <div class="text-subtitle-1 font-weight-medium mt-6 mb-2">확률과 오해</div>
      <ul class="pl-6" style="line-height:1.7; text-align:left;">
        <li>로또 6/45 조합 수는 8,145,060가지입니다.</li>
        <li>각 조합의 당첨 확률은 동일합니다. ‘지난주에 안 나온 숫자’가 이번에 더 나올 가능성은 없습니다.</li>
        <li>생일 등 편향된 선택은 다른 사람과 중복될 가능성을 높일 수 있습니다.</li>
      </ul>

      <div class="text-subtitle-1 font-weight-medium mt-6 mb-2">책임 있는 이용</div>
      <ul class="pl-6" style="line-height:1.7; text-align:left;">
        <li>과도한 구매를 피하고 예산을 정해 즐기세요.</li>
        <li>문제가 있다고 느끼면 전문기관 도움을 받으세요.</li>
      </ul>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
