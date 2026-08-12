<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildJiangsuSalesMapOption } from '@/views/analyse/charts/jiangsuSalesMapOption';

defineOptions({ name: 'AnalyseJiangsuMap' });

const JIANGSU_GEO_URL = `${import.meta.env.BASE_URL}geo/320000_full.json`;

const chartElement = ref<HTMLDivElement>();
let chart: EChartsType | undefined;

async function renderChart() {
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

  const response = await fetch(JIANGSU_GEO_URL);
  if (!response.ok) {
    console.error('[AnalyseJiangsuMap] geo json load failed', response.status);
    return;
  }

  const geoJson = await response.json();
  echarts.registerMap('jiangsu', geoJson);
  chart.setOption(buildJiangsuSalesMapOption(), true);
}

onMounted(async () => {
  await nextTick();
  await renderChart();
});

onBeforeUnmount(() => {
  chart?.dispose();
  chart = undefined;
});
</script>

<template>
  <div class="analyse-jiangsu-map">
    <div ref="chartElement" class="analyse-jiangsu-map__chart" />
  </div>
</template>

<style lang="scss" scoped>
.analyse-jiangsu-map {
  width: 100%;
  height: 567px;
  margin: 14px 0 0;

  &__chart {
    width: 100%;
    height: 100%;
  }
}
</style>
