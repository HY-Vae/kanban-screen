<script lang="ts" setup>
import InsightAsidePanel from '@/views/insight/components/InsightAsidePanel.vue';
import { useInsightParkAreas } from '@/views/insight/composables/useInsightParkAreas';

defineOptions({ name: 'InsightParkAreas' });

const { list } = useInsightParkAreas();
</script>

<template>
  <div class="insight-park-areas">
    <InsightAsidePanel title="园区规划">
      <ul class="insight-park-areas__grid">
        <li v-for="item in list" :key="item.id">
          <h2>{{ item.area }} ㎡</h2>
          <p>{{ item.summary }}</p>
        </li>
      </ul>
    </InsightAsidePanel>
  </div>
</template>

<style lang="scss" scoped>
.insight-park-areas {
  width: 100%;

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    width: 100%;
    margin: 19px 0 0;
  }

  li {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 144px;
    height: 83px;
    margin: 0 24px 14px 0;
    background: url('@/views/insight/images/bg-right-bottom.png') no-repeat center;
    background-size: cover;

    &::before {
      position: absolute;
      bottom: -5px;
      z-index: 1;
      width: 10px;
      height: 10px;
      content: '';
      background: var(--kanban-color-accent);
      border-radius: 50%;
    }

    &::after {
      position: absolute;
      bottom: -10px;
      width: 20px;
      height: 20px;
      content: '';
      background: var(--kanban-color-accent-muted);
      border-radius: 50%;
      animation: insight-zoom-pulse 0.8s alternate infinite;
    }

    &:nth-child(3n) {
      margin-right: 0;
    }

    h2 {
      margin: 0 0 2px;
      font-size: 18px;
      color: var(--kanban-color-accent);
    }

    p {
      font-size: 12px;
      color: #fff;
    }
  }
}

@keyframes insight-zoom-pulse {
  from {
    opacity: 0.5;
    transform: scale(0.7);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
