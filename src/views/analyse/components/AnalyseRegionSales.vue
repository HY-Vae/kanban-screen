<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildRegionSalesLineOption } from '@/views/analyse/charts/regionSalesLineOption';
import AnalysePanelTitle from '@/views/analyse/components/AnalysePanelTitle.vue';
import { useAnalyseRegionSales } from '@/views/analyse/composables/useAnalyseRegionSales';

defineOptions({ name: 'AnalyseRegionSales' });

const { regions } = useAnalyseRegionSales();

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

  chart.setOption(buildRegionSalesLineOption(regions.value), true);
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(
  regions,
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
  <div class="analyse-region-sales">
    <AnalysePanelTitle title="销售设备数量区域占比" />
    <div ref="chartElement" class="analyse-region-sales__chart" />
  </div>
</template>

<style lang="scss" scoped>
.analyse-region-sales {
  width: 100%;
  height: 284px;
  margin: 6px 0 0;

  &__chart {
    width: 100%;
    height: 275px;
  }
}
</style>
