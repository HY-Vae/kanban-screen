<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildParkPlanTrendOption } from '@/views/insight/charts/parkPlanTrendOption';
import InsightAsidePanel from '@/views/insight/components/InsightAsidePanel.vue';
import { useInsightParkPlan } from '@/views/insight/composables/useInsightParkPlan';

defineOptions({ name: 'InsightParkPlanTrend' });

const { series } = useInsightParkPlan();

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

  chart.setOption(buildParkPlanTrendOption(series.value), true);
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
  <div class="insight-park-plan">
    <InsightAsidePanel title="园区规划">
      <div ref="chartElement" class="insight-park-plan__chart" />
    </InsightAsidePanel>
  </div>
</template>

<style lang="scss" scoped>
.insight-park-plan {
  width: 100%;
  height: 272px;

  &__chart {
    width: 100%;
    height: 200px;
  }
}
</style>
