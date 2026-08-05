<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildBrandShowcaseBarOption } from '@/views/analyse/charts/brandShowcaseBarOption';
import AnalysePanelTitle from '@/views/analyse/components/AnalysePanelTitle.vue';
import { useAnalyseBrandShowcase } from '@/views/analyse/composables/useAnalyseBrandShowcase';

defineOptions({ name: 'AnalyseBrandShowcase' });

const { brands } = useAnalyseBrandShowcase();

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

  chart.setOption(buildBrandShowcaseBarOption(brands.value), true);
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(
  brands,
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
  <div class="analyse-brand-showcase">
    <AnalysePanelTitle title="数据分析展示" />
    <div ref="chartElement" class="analyse-brand-showcase__chart" />
  </div>
</template>

<style lang="scss" scoped>
.analyse-brand-showcase {
  width: 100%;
  height: 350px;
  margin: 10px;

  &__chart {
    width: 100%;
    height: 320px;
  }
}
</style>
