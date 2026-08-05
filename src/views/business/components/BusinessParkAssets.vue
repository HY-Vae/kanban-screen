<script lang="ts" setup>
import { useBusinessParkAssets } from '@/views/business/composables/useBusinessParkAssets';

defineOptions({ name: 'BusinessParkAssets' });

const { assets } = useBusinessParkAssets();
</script>

<template>
  <ul class="business-park-assets">
    <li v-for="item in assets" :key="item.id">
      <img :src="item.image" alt="" />
      <h2>{{ item.title }}</h2>
      <div class="business-park-assets__detail">
        <strong>{{ item.amount }}</strong>
        <span>{{ item.describe }}</span>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.business-park-assets {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 407px;
  margin: 30px 0 0;
  background: url('@/views/business/images/content/bg-middle.png') no-repeat center;
  background-size: cover;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    img {
      width: 165px;
      height: 183px;
      object-fit: cover;
      animation: business-shake-y 1s ease-in-out infinite;
    }

    h2 {
      width: 140px;
      height: 40px;
      margin: 17px 0 18px;
      font-size: 14px;
      line-height: 40px;
      color: var(--kanban-color-accent);
      text-align: center;
      background: url('@/views/business/images/content/bg-middle-tag.png') no-repeat center;
      background-size: cover;
    }
  }

  &__detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 140px;
    height: 99px;
    background: url('@/views/business/images/content/bg-middle-detail.png') no-repeat center;
    background-size: cover;

    strong {
      font-size: 32px;
      color: var(--kanban-color-accent);
    }

    span {
      font-size: 16px;
      color: #fff;
    }
  }
}

@keyframes business-shake-y {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}
</style>
