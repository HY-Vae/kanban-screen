<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildBrandShareRoseOption } from '@/views/analyse/charts/brandShareRoseOption';
import AnalysePanelTitle from '@/views/analyse/components/AnalysePanelTitle.vue';
import { useAnalyseBrandShare } from '@/views/analyse/composables/useAnalyseBrandShare';

defineOptions({ name: 'AnalyseBrandShare' });

const { brands } = useAnalyseBrandShare();

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

  chart.setOption(buildBrandShareRoseOption(brands.value), true);
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
  <div class="analyse-brand-share">
    <AnalysePanelTitle title="品牌占有率" />
    <div ref="chartElement" class="analyse-brand-share__chart" />
  </div>
</template>

<style lang="scss" scoped>
.analyse-brand-share {
  width: 100%;
  height: 387px;
  margin: 25px 0 0;
  color: #fff;

  &__chart {
    width: 100%;
    height: 100%;
    margin: 0 0 25px;
  }
}
</style>
