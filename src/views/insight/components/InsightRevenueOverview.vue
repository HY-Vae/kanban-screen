<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildRevenueOverviewOption } from '@/views/insight/charts/revenueOverviewOption';
import { useInsightRevenueOverview } from '@/views/insight/composables/useInsightRevenueOverview';

defineOptions({ name: 'InsightRevenueOverview' });

const { values } = useInsightRevenueOverview();

const chartElement = ref<HTMLDivElement>();
let chart: EChartsType | undefined;

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

  chart.setOption(buildRevenueOverviewOption(values.value), true);
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(
  values,
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
  <div class="insight-revenue">
    <div ref="chartElement" class="insight-revenue__chart" />
  </div>
</template>

<style lang="scss" scoped>
.insight-revenue {
  width: 100%;
  height: 377px;
  margin: 16px 0 0;

  &__chart {
    width: 100%;
    height: 100%;
    padding: 19px 0 0;
  }
}
</style>
