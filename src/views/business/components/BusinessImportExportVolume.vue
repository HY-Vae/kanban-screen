<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import { displayContent } from '@/components/DigitalNumber/DigitalCurrency';
import TimeSelect from '@/components/TimeSelect/index.vue';
import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildImportExportBarOption } from '@/views/business/charts/importExportBarOption';
import BusinessAsidePanel from '@/views/business/components/BusinessAsidePanel.vue';
import { useBusinessImportExport } from '@/views/business/composables/useBusinessImportExport';

defineOptions({ name: 'BusinessImportExportVolume' });

const { data } = useBusinessImportExport();

const chartElement = ref<HTMLDivElement>();
let chart: EChartsType | undefined;

const timeList = computed(() => data.value.periods);

function renderChart() {
  if (!chartElement.value) {
    return;
  }

  if (!chart) {
    chart = echarts.init(chartElement.value, null, {
      renderer: 'svg',
      devicePixelRatio: window.devicePixelRatio,
    });
    debounceChart(chart);
  }

  chart.setOption(buildImportExportBarOption(data.value.importBar, data.value.exportBar), true);
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(
  () => [data.value.importBar, data.value.exportBar],
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
  <div class="business-import-export">
    <BusinessAsidePanel tag="总数据" title="园区进出口额">
      <template #actions>
        <TimeSelect :time-list="timeList" />
      </template>

      <div class="business-import-export__digit">
        <component :is="displayContent(data.totalDisplay)" />
      </div>

      <div ref="chartElement" class="business-import-export__chart" />

      <ul class="business-import-export__values">
        <li>
          进口额
          <i>¥{{ data.importAmount }}</i>
        </li>
        <li class="thin-line h-[20px]" />
        <li>
          <i>¥{{ data.exportAmount }}</i>
          出口额
        </li>
      </ul>
    </BusinessAsidePanel>
  </div>
</template>

<style lang="scss" scoped>
.business-import-export {
  width: 100%;
  height: 246px;

  &__digit {
    margin: 26px 0 0;

    :deep(span) {
      height: 69px;
    }
  }

  &__chart {
    width: 495px;
    height: 24px;
    margin: 21px 0 0;
  }

  &__values {
    display: flex;
    justify-content: space-between;
    margin: 9px 0 0;
    font-size: 18px;

    i {
      font-size: 20px;
      font-style: normal;
      color: var(--kanban-color-accent);
    }
  }
}
</style>
