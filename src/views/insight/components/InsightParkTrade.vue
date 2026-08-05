<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';

import DigitalNumber from '@/components/DigitalNumber/DigitalNumber';
import TimeSelect from '@/components/TimeSelect/index.vue';
import type { TimeSelectType } from '@/components/TimeSelect/type';
import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildParkTradeBarOption } from '@/views/insight/charts/parkTradeBarOption';
import InsightAsidePanel from '@/views/insight/components/InsightAsidePanel.vue';
import { useInsightParkTrade } from '@/views/insight/composables/useInsightParkTrade';

defineOptions({ name: 'InsightParkTrade' });

const TIME_LIST = ref<TimeSelectType[]>([
  { label: '2020.09', value: '2020-09' },
  { label: '2021.09', value: '2021-09' },
  { label: '2022.09', value: '2022-08' },
  { label: '2023.09', value: '2023-08' },
  { label: '2025.09', value: '2025-08' },
]);

const form = reactive({
  date: TIME_LIST.value[0].value,
});

const { data, refresh } = useInsightParkTrade(() => form.date);

const dateModel = computed({
  get: () => form.date,
  set: (value: string) => {
    form.date = value;
    void refresh();
  },
});

const chartElement = ref<HTMLDivElement>();
let chart: EChartsType | undefined;

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

  chart.setOption(buildParkTradeBarOption(data.value.importAmount, data.value.exportAmount), true);
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(
  () => [data.value.importAmount, data.value.exportAmount],
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
  <div class="insight-park-trade">
    <InsightAsidePanel title="园区进出口额">
      <template #actions>
        <TimeSelect v-model="dateModel" :time-list="TIME_LIST" />
      </template>

      <div class="money-digit">
        <DigitalNumber :money="data.amount" :separator="true">
          <span>￥</span>
        </DigitalNumber>
      </div>

      <div ref="chartElement" class="insight-park-trade__bar" />

      <ul class="insight-park-trade__values">
        <li>
          进口额
          <i>¥ {{ data.importAmount }}</i>
        </li>
        <li class="thin-line h-[20px]" />
        <li>
          <i>¥ {{ data.exportAmount }}</i>
          出口额
        </li>
      </ul>
    </InsightAsidePanel>
  </div>
</template>

<style lang="scss" scoped>
.insight-park-trade {
  width: 100%;
  height: 226px;

  .money-digit {
    width: 100%;
    margin: 14px 0 0;

    :deep(span) {
      height: 69px;
    }
  }

  &__bar {
    width: 100%;
    height: 24px;
    margin: 14px 0 0;
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
