<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildTrendPictorialBarOption } from '@/views/business/charts/trendPictorialBarOption';

defineOptions({ name: 'BusinessTrendBar' });

const props = defineProps<{
  chartValue: number;
}>();

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

  chart.setOption(buildTrendPictorialBarOption(props.chartValue), true);
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(
  () => props.chartValue,
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
  <div ref="chartElement" class="business-trend-bar" />
</template>

<style lang="scss" scoped>
.business-trend-bar {
  width: 20px;
  height: 63px;
}
</style>
