<script lang="ts" setup>
import { useRouter } from 'vue-router';

defineOptions({ name: 'PortalContent' });

const router = useRouter();

/** 入口卡片：跳转各业务大屏 */
const screenEntries = [
  { key: 'parking', title: '停车场', image: '/images/portal/car.png', target: '/parking' },
  { key: 'analyse', title: '数据分析', image: '/images/portal/distribution.png', target: '/analyse' },
  { key: 'insight', title: '大数据', image: '/images/portal/muck.png', target: '/insight' },
  { key: 'community', title: '社区', image: '/images/portal/clean-city.png', target: '/community' },
  { key: 'business', title: '经营监督', image: '/images/portal/lamp.png', target: '/business' },
] as const;
</script>

<template>
  <div class="portal-content">
    <div class="portal-content__banner">
      <p>
        <img alt="看板标题" src="../images/portal-logo.png" />
        <i>看板</i>
        你好，欢迎使用数据可视化中心
      </p>
    </div>
    <ul class="portal-content__list">
      <li v-for="entry in screenEntries" :key="entry.key" @click="router.push(entry.target)">
        <img :alt="entry.title" :src="entry.image" />
        <span>{{ entry.title }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.portal-content {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-around;

  &__banner {
    margin: 156px 0 0;
    animation: flipInY 0.6s 0.4s;
  }

  p {
    font-size: 16px;
    color: #fff;

    i {
      color: var(--kanban-color-accent);
    }
  }

  img {
    width: 239px;
    height: 34px;
  }
}

.portal-content__list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1477px;
  height: 260px;
  margin: 104px 0 0;

  li {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    width: 280px;
    height: 260px;
    cursor: pointer;
    transition: all 1s;

    &:nth-child(1) {
      background: linear-gradient(to bottom, #006efec9, #494affc9);
    }

    &:nth-child(2) {
      background: linear-gradient(to bottom, #2ad3acc9, #037a9cc9);
    }

    &:nth-child(3) {
      background: linear-gradient(to bottom, #4c09bec9, #870effc9);
    }

    &:nth-child(4) {
      background: linear-gradient(to bottom, #00b9ffc9, #034f7ec9);
    }

    &:nth-child(5) {
      background: linear-gradient(to bottom, #0ad1d1c9, #10607cc9);
    }

    &:nth-child(n):hover {
      background: linear-gradient(to bottom, #164ec2c9, #1fa3dec9);
    }

    img {
      width: 108px;
      height: 108px;
      animation: headShake 2s ease-out alternate infinite;
    }

    span {
      position: relative;
      display: block;
      margin: 38px 0 0;
      font-size: 28px;
      color: #fff;

      &::after {
        position: absolute;
        bottom: -9px;
        left: 50%;
        width: 37px;
        height: 5px;
        content: '';
        background: #fff;
        border-radius: 3px;
        box-shadow: inset #707070 0 0 3px 1px;
        transform: translateX(-50%);
      }
    }
  }
}
</style>
