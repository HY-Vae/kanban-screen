<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildDataShowPolarOption } from '@/views/analyse/charts/dataShowPolarOption';
import AnalysePanelTitle from '@/views/analyse/components/AnalysePanelTitle.vue';
import { useAnalyseDataStatistics } from '@/views/analyse/composables/useAnalyseDataStatistics';

defineOptions({ name: 'AnalyseDataStatistics' });

const { statistics } = useAnalyseDataStatistics();

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

  chart.setOption(buildDataShowPolarOption(statistics.value), true);
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(
  statistics,
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
  <div class="analyse-data-statistics">
    <AnalysePanelTitle title="数据展示统计" />
    <div ref="chartElement" class="analyse-data-statistics__chart" />
  </div>
</template>

<style lang="scss" scoped>
.analyse-data-statistics {
  width: 100%;
  height: 257px;
  margin: 10px 0 0;

  &__chart {
    width: 100%;
    height: 100%;
    margin: 19px 0 0;
  }
}
</style>
