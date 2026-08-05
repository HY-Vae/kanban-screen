<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildSecurityGaugeOption } from '@/views/community/charts/securityGaugeOption';
import { useCommunityPopulationStage } from '@/views/community/composables/useCommunityPopulationStage';

defineOptions({ name: 'CommunityPopulationStage' });

const FEATURE_CARDS = [
  { id: 'feature-1', title: '大数据中心', image: '/images/community/body-image-1.png' },
  { id: 'feature-2', title: '数字楼宇', image: '/images/community/body-image-2.png' },
  { id: 'feature-3', title: '平台设备管理', image: '/images/community/body-image-3.png' },
];

const { populationCards, deviceStatus } = useCommunityPopulationStage();

const chartElement = ref<HTMLDivElement>();
let chart: EChartsType | undefined;

const leadingMetrics = computed(() => deviceStatus.value.metrics.slice(0, 2));
const trailingMetrics = computed(() => deviceStatus.value.metrics.slice(2, 4));

function renderChart() {
  if (!chartElement.value) {
    return;
  }

  if (!chart) {
    chart = echarts.init(chartElement.value, null, {
      renderer: 'canvas',
      devicePixelRatio: window.devicePixelRatio,
    });
    debounceChart(chart);
  }

  chart.setOption(buildSecurityGaugeOption(deviceStatus.value.securityIndex), true);
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(
  () => deviceStatus.value.securityIndex,
  () => {
    renderChart();
  }
);

onBeforeUnmount(() => {
  chart?.dispose();
  chart = undefined;
});
</script>

<template>
  <div class="community-population-stage">
    <header class="community-population-stage__header">
      <ul class="community-population-stage__stats">
        <li v-for="(item, index) in populationCards" :key="item.id" class="community-population-stage__stat-card">
          <div class="community-population-stage__stat-content">
            <h1>{{ item.name }}</h1>
            <h2>{{ item.total }}</h2>
            <span>{{ item.subtitle }} {{ item.ratio }}%（{{ item.subTotal }}）</span>
          </div>
          <img :src="`/images/community/bg-card-${index + 1}.png`" alt="" />
        </li>
      </ul>
    </header>

    <main class="community-population-stage__main">
      <ul class="community-population-stage__features">
        <li v-for="item in FEATURE_CARDS" :key="item.id">
          <img :src="item.image" alt="" class="community-population-stage__feature-image" />
          <span>{{ item.title }}</span>
        </li>
      </ul>

      <div class="community-population-stage__metrics">
        <div v-for="item in leadingMetrics" :key="item.id" class="community-population-stage__metric-card">
          <h1>{{ item.value }}</h1>
          <span>
            设备
            <br />
            {{ item.label }}
          </span>
        </div>

        <div ref="chartElement" class="community-population-stage__gauge" />

        <div v-for="item in trailingMetrics" :key="item.id" class="community-population-stage__metric-card">
          <h1>{{ item.value }}</h1>
          <span>
            设备
            <br />
            {{ item.label }}
          </span>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.community-population-stage {
  width: 100%;
  height: 100%;

  &__stats {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__stat-card {
    position: relative;
    width: 215px;
    height: 204px;
    color: #fff;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  &__stat-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 20px;

    h1 {
      font-size: 24px;
    }

    h2 {
      font-size: 38px;
    }

    span {
      font-size: 14px;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 660px;
    margin-top: 40px;
    background: url('../images/bg-body.png') no-repeat center;
    background-size: contain;
  }

  &__features {
    display: flex;
    width: 100%;
    height: 286px;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 286px;
      height: 286px;
      font-size: 24px;
      color: var(--kanban-color-brand-4);
    }
  }

  &__feature-image {
    width: 230px;
    height: 209px;
    animation: community-pulse 1.6s ease-in-out infinite;
  }

  &__metrics {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 170px;
    margin-top: 44px;
  }

  &__metric-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 105px;
    height: 170px;
    background: url('../images/bg-body-card.png') no-repeat center;
    background-size: cover;

    h1 {
      font-size: 40px;
      color: var(--kanban-color-accent);
    }

    span {
      font-size: 14px;
      color: #fff;
      text-align: center;
    }
  }

  &__gauge {
    width: 286px;
    height: 169px;
    padding: 20px;
    color: #fff;
    background: url('../images/bg-body-instrument-panel.png') no-repeat center;
    background-size: cover;
  }
}

@keyframes community-pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.85;
    transform: scale(1.04);
  }
}
</style>
