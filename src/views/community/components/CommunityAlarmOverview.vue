<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildAlarmOverviewOption } from '@/views/community/charts/alarmOverviewOption';
import CommunityPanel from '@/views/community/components/CommunityPanel.vue';
import { useCommunityAlarmOverview } from '@/views/community/composables/useCommunityAlarmOverview';

defineOptions({ name: 'CommunityAlarmOverview' });

const { alarms } = useCommunityAlarmOverview();

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

  chart.setOption(buildAlarmOverviewOption(alarms.value.total, alarms.value.list), true);
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(
  alarms,
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
  <div class="community-alarm-overview">
    <CommunityPanel title="预警概览">
      <div ref="chartElement" class="community-alarm-overview__chart" />
    </CommunityPanel>
  </div>
</template>

<style lang="scss" scoped>
.community-alarm-overview {
  width: 100%;
  padding: 9px 15px;
  background: rgb(14 95 255 / 20%);

  &__chart {
    width: 100%;
    height: 100%;
  }
}
</style>
