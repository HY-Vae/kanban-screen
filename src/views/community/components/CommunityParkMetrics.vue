<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildMetricsRoseOption } from '@/views/community/charts/metricsRoseOption';
import CommunityPanel from '@/views/community/components/CommunityPanel.vue';
import { useCommunityParkMetrics } from '@/views/community/composables/useCommunityParkMetrics';

defineOptions({ name: 'CommunityParkMetrics' });

const { metrics } = useCommunityParkMetrics();

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

  chart.setOption(buildMetricsRoseOption(metrics.value), true);
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(
  metrics,
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
  <div class="community-park-metrics">
    <CommunityPanel title="园区指标">
      <div ref="chartElement" class="community-park-metrics__chart" />
    </CommunityPanel>
  </div>
</template>

<style lang="scss" scoped>
.community-park-metrics {
  width: 100%;
  padding: 9px 15px;
  background: rgb(14 95 255 / 20%);

  &__chart {
    width: 100%;
    height: 100%;
  }
}
</style>
