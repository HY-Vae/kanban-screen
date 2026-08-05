<script lang="ts" setup>
import { useRouter } from 'vue-router';

defineOptions({ name: 'PortalFooter' });

const router = useRouter();

/** 底部快捷入口 */
const quickLinks = [
  { key: 'home', icon: 'i-material-symbols:home-and-garden', name: '首页', target: '/portal' },
  { key: 'park', icon: 'i-fa:building', name: '园区', target: '/portal' },
  { key: 'business', icon: 'i-fa-solid:chart-line', name: '经营监督', target: '/business' },
  { key: 'insight', icon: 'i-eos-icons:big-data-outlined', name: '大数据', target: '/insight' },
] as const;
</script>

<template>
  <footer class="portal-footer">
    <ul class="portal-footer__list">
      <li v-for="link in quickLinks" :key="link.key" @click="router.push(link.target)">
        <i :class="link.icon" />
        <span class="hover">{{ link.name }}</span>
      </li>
    </ul>
  </footer>
</template>

<style lang="scss" scoped>
.portal-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 190px 0 0;

  &__list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 431px;
    height: 90px;

    li {
      display: flex;
      flex-flow: column wrap;
      align-items: center;
      justify-content: center;
      width: 90px;
      height: 90px;
      color: var(--kanban-color-info);
      background: url('@/assets/images/common/bg/bg-main-2.png') no-repeat center;
      background-size: cover;

      i {
        width: 26px;
        height: 26px;
        font-size: 26px;
      }

      span {
        margin: 4px 0 0;
        font-size: 13px;
        cursor: pointer;
      }
    }
  }
}
</style>
