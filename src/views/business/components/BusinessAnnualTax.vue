<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import TimeSelect from '@/components/TimeSelect/index.vue';
import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildAnnualTaxBarOption } from '@/views/business/charts/annualTaxBarOption';
import { useBusinessAnnualTax } from '@/views/business/composables/useBusinessAnnualTax';

defineOptions({ name: 'BusinessAnnualTax' });

const { data } = useBusinessAnnualTax();

const chartElement = ref<HTMLDivElement>();
let chart: EChartsType | undefined;

const timeList = computed(() => data.value.periods);
const unitText = computed(() => (data.value.unit ? `单位/${data.value.unit}` : ''));

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

  chart.setOption(buildAnnualTaxBarOption(data.value.series), true);
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(
  () => data.value.series,
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
  <div class="business-annual-tax">
    <div class="business-annual-tax__inner">
      <div class="business-annual-tax__title">
        <div class="flex-x-between">
          <h2>年度税收概览</h2>
          <span class="business-annual-tax__unit">{{ unitText }}</span>
        </div>
        <TimeSelect :time-list="timeList" />
      </div>
      <div ref="chartElement" class="business-annual-tax__chart" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.business-annual-tax {
  width: 100%;
  height: 294px;
  margin: 20px 0 0;
  background: url('@/views/business/images/content/bg-bottom.png') no-repeat center;
  background-size: cover;

  &__inner {
    padding: 20px;
    color: #fff;
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 35px;

    h2 {
      font-size: 22px;
    }
  }

  &__unit {
    display: inline-block;
    margin: 14px 0 0 4px;
    font-size: 12px;
  }

  &__chart {
    width: 100%;
    height: 197px;
  }
}
</style>
