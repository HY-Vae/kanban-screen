<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildIncomeProgressOption } from '@/views/insight/charts/incomeProgressOption';

defineOptions({ name: 'InsightIncomeProgress' });

const props = defineProps<{
  percent: number;
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

  chart.setOption(buildIncomeProgressOption(props.percent), true);
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(
  () => props.percent,
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
  <div ref="chartElement" class="insight-income-progress" />
</template>

<style lang="scss" scoped>
.insight-income-progress {
  width: 100px;
  height: 100px;
}
</style>
