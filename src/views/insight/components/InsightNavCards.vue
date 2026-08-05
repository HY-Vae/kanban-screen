<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

defineOptions({ name: 'InsightNavCards' });

const NAV_CARDS = [
  { id: 'staff', title: '员工', image: '/images/insight/bg-content-top-1.png' },
  { id: 'building', title: '智慧大楼', image: '/images/insight/bg-content-top-2.png' },
  { id: 'device', title: '智慧设备', image: '/images/insight/bg-content-top-3.png' },
  { id: 'report', title: '数据报表', image: '/images/insight/bg-content-top-4.png' },
] as const;

const arrowActive = ref(true);

onMounted(() => {
  useIntervalFn(() => {
    arrowActive.value = !arrowActive.value;
  }, 2000);
});
</script>

<template>
  <div class="insight-nav">
    <ul class="insight-nav__cards">
      <li v-for="item in NAV_CARDS" :key="item.id" class="insight-nav__card">
        <img :src="item.image" alt="" class="insight-nav__icon" />
        <h2>{{ item.title }}</h2>
      </li>
    </ul>

    <div class="insight-nav__workbench">
      <img
        :class="arrowActive ? 'insight-nav__arrow--down' : 'insight-nav__arrow--up'"
        alt=""
        class="insight-nav__arrow"
        src="@/views/insight/images/bg-middle-move.png"
      />
      <h1>工作台</h1>
      <img
        :class="arrowActive ? 'insight-nav__arrow--up' : 'insight-nav__arrow--down'"
        alt=""
        class="insight-nav__arrow"
        src="@/views/insight/images/bg-middle-move.png"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.insight-nav {
  width: 100%;

  &__cards {
    display: flex;
    justify-content: space-between;
    width: 748px;
    height: 351px;
    margin: 39px 0 0;
  }

  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 171px;
    height: 283px;

    h2 {
      width: 130px;
      height: 52px;
      font-size: 16px;
      line-height: 54px;
      color: var(--kanban-color-accent);
      text-align: center;
      background: url('@/views/insight/images/bg-content-top-item.png') no-repeat center;
      background-size: cover;
    }

    &:nth-child(1),
    &:nth-child(4) {
      transform: translateY(68px);
    }
  }

  &__icon {
    width: 171px;
    height: 191px;
    animation: insight-shake-y 4s linear infinite;
  }

  &__workbench {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 267px;
    height: 189px;
    margin: 0 auto;
    overflow: hidden;

    h1 {
      width: 266px;
      height: 109px;
      font-size: 34px;
      line-height: 109px;
      color: var(--kanban-color-accent);
      text-align: center;
      background: url('@/views/insight/images/bg-middle-title.png') no-repeat center;
      background-size: cover;
    }
  }

  &__arrow {
    display: block;
  }

  &__arrow--down {
    animation: 2s linear 0s infinite normal none running line-move;
  }

  &__arrow--up {
    animation: 2s linear 0s infinite normal none running line-move-alternate;
  }
}

@keyframes insight-shake-y {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}
</style>
