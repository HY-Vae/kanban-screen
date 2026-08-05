<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildServiceRatioBarOption } from '@/views/community/charts/serviceRatioBarOption';

defineOptions({ name: 'CommunityServiceRatioBar' });

const props = defineProps<{
  title: string;
  completed: number;
  remaining: number;
}>();

const chartElement = ref<HTMLDivElement>();
let chart: EChartsType | undefined;

const percents = computed(() => {
  const sum = props.completed + props.remaining;
  if (sum <= 0) {
    return { completedPercent: 0, remainingPercent: 0 };
  }

  const completedPercent = Math.round((props.completed / sum) * 100);
  return {
    completedPercent,
    remainingPercent: 100 - completedPercent,
  };
});

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

  chart.setOption(buildServiceRatioBarOption(percents.value.completedPercent, percents.value.remainingPercent), true);
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(percents, () => {
  renderChart();
});

onBeforeUnmount(() => {
  chart?.dispose();
  chart = undefined;
});
</script>

<template>
  <div class="community-service-ratio-bar">
    <span class="community-service-ratio-bar__title">{{ title }}</span>
    <div ref="chartElement" class="community-service-ratio-bar__chart" />
  </div>
</template>

<style lang="scss" scoped>
.community-service-ratio-bar {
  width: 100%;

  &__title {
    display: block;
    margin-bottom: 4px;
    color: #fff;
  }

  &__chart {
    width: 100%;
    height: 20px;
  }
}
</style>
