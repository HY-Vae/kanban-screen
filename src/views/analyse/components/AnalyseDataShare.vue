<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core';
import type { EChartsType } from 'echarts';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart, resetSelect, selectSector } from '@/utils/chart';
import { buildDataShareDonutOption } from '@/views/analyse/charts/dataShareDonutOption';
import AnalysePanelTitle from '@/views/analyse/components/AnalysePanelTitle.vue';
import { useAnalyseDataShare } from '@/views/analyse/composables/useAnalyseDataShare';

defineOptions({ name: 'AnalyseDataShare' });

const { shares } = useAnalyseDataShare();

const chartElement = ref<HTMLDivElement>();
const currentIndex = ref(0);
let chart: EChartsType | undefined;
let pauseCarousel: (() => void) | undefined;
let resumeCarousel: (() => void) | undefined;

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

  chart.setOption(buildDataShareDonutOption(shares.value), true);
}

function highlightCurrent() {
  if (!chart || shares.value.length === 0) {
    return;
  }

  if (currentIndex.value >= shares.value.length) {
    currentIndex.value = 0;
  }

  resetSelect(chart);
  selectSector(chart, currentIndex.value);
  currentIndex.value += 1;
}

onMounted(async () => {
  await nextTick();
  renderChart();

  const carousel = useIntervalFn(() => {
    highlightCurrent();
  }, 1000);
  pauseCarousel = carousel.pause;
  resumeCarousel = carousel.resume;

  chartElement.value?.addEventListener('mouseenter', () => {
    if (chart) {
      resetSelect(chart);
    }
    pauseCarousel?.();
  });
  chartElement.value?.addEventListener('mouseleave', () => {
    resumeCarousel?.();
  });
});

watch(
  shares,
  () => {
    currentIndex.value = 0;
    renderChart();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  pauseCarousel?.();
  chart?.dispose();
  chart = undefined;
});
</script>

<template>
  <div class="analyse-data-share">
    <AnalysePanelTitle title="数据占有率" />
    <div ref="chartElement" class="analyse-data-share__chart" />
  </div>
</template>

<style lang="scss" scoped>
.analyse-data-share {
  width: 100%;
  height: 305px;
  margin: 10px 0 0;

  &__chart {
    width: 100%;
    height: 100%;
  }
}
</style>
