<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildDeviceRatioBarOption } from '@/views/community/charts/deviceRatioBarOption';

defineOptions({ name: 'CommunityDeviceRatioBar' });

const props = defineProps<{
  internalPercent: number;
  connectedPercent: number;
}>();

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

  chart.setOption(buildDeviceRatioBarOption(props.internalPercent, props.connectedPercent), true);
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(
  () => [props.internalPercent, props.connectedPercent],
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
  <div ref="chartElement" class="community-device-ratio-bar" />
</template>

<style lang="scss" scoped>
.community-device-ratio-bar {
  width: 100%;
  height: 20px;
}
</style>
