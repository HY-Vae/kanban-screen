<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildTrafficFlowOption } from '@/views/parking/charts/trafficFlowOption';
import { useParkingTrafficOverview } from '@/views/parking/composables/useParkingTrafficOverview';

defineOptions({ name: 'ParkingTrafficOverview' });

const { overview, series } = useParkingTrafficOverview();

const chartElement = ref<HTMLDivElement>();
let chart: EChartsType | undefined;

function renderChart() {
  if (!chartElement.value) {
    return;
  }

  if (!chart) {
    chart = echarts.init(chartElement.value, null, {
      renderer: 'svg',
      devicePixelRatio: window.devicePixelRatio,
    });
    debounceChart(chart);
  }

  chart.setOption(buildTrafficFlowOption(series.value), true);
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(
  series,
  () => {
    renderChart();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  chart?.dispose();
  chart = undefined;
});
</script>

<template>
  <aside class="parking-traffic-overview">
    <div class="parking-traffic-overview__body">
      <div class="parking-traffic-overview__title">
        <h1>近7天车流量概览</h1>
      </div>

      <ul class="parking-traffic-overview__metrics">
        <li v-for="item in overview" :key="item.key" class="parking-traffic-overview__metric">
          <span>{{ item.label }}</span>
          <span>{{ item.value }}</span>
        </li>
      </ul>

      <div class="parking-traffic-overview__chart-wrap">
        <div ref="chartElement" class="parking-traffic-overview__chart" />
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.parking-traffic-overview {
  width: 380px;
  height: 650px;
  background: url('@/views/parking/images/bg/bg-side.png') no-repeat center;
  background-size: cover;
  transform-style: preserve-3d;

  &__body {
    padding: 55px 0 0 25px;
  }

  &__title {
    width: 218px;
    height: 59px;
    background: url('@/views/parking/images/bg/bg-road-condition.png') no-repeat center;
    background-size: cover;

    h1 {
      font-size: 18px;
      color: #fff;
    }
  }

  &__metrics {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 331px;
    margin-top: 32px;
  }

  &__metric {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 162px;
    height: 111px;
    text-align: center;

    span:nth-child(1) {
      width: 161px;
      height: 40px;
      font-size: 16px;
      line-height: 40px;
      color: #fff;
      background: url('@/views/parking/images/bg/bg-frame-2.png') no-repeat center;
      background-size: cover;
    }

    span:nth-child(2) {
      width: 161px;
      height: 66px;
      font-size: 34px;
      line-height: 66px;
      color: var(--kanban-color-accent);
      background: url('@/views/parking/images/bg/bg-frame-3.png') no-repeat center;
      background-size: cover;
    }
  }

  &__chart-wrap {
    width: 325px;
    height: 205px;
  }

  &__chart {
    width: 100%;
    height: 100%;
    margin-top: 71px;
  }
}
</style>
