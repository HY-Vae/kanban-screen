<script lang="ts" setup>
import type { EChartsType } from 'echarts';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import echarts from '@/plugins/echarts';
import { debounceChart } from '@/utils/chart';
import { buildEnterpriseTypePieOption } from '@/views/business/charts/enterpriseTypePieOption';
import BusinessAsidePanel from '@/views/business/components/BusinessAsidePanel.vue';
import { useBusinessEnterpriseOverview } from '@/views/business/composables/useBusinessEnterpriseOverview';

defineOptions({ name: 'BusinessEnterpriseOverview' });

const { data } = useBusinessEnterpriseOverview();

const chartElement = ref<HTMLDivElement>();
let chart: EChartsType | undefined;

const describe = computed(() => (data.value.asOf ? `截止时间至${data.value.asOf}` : ''));
const stateOwned = computed(() => data.value.types.find((item) => item.id === 'type-state')?.value ?? 0);
const privateOwned = computed(() => data.value.types.find((item) => item.id === 'type-private')?.value ?? 0);
const investmentTrendText = computed(() => formatTrend(data.value.investmentTrend));
const taxTrendText = computed(() => formatTrend(data.value.taxTrend));

function formatTrend(trend: number) {
  return `${trend > 0 ? '+' : ''}${trend}%`;
}

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

  chart.setOption(buildEnterpriseTypePieOption(data.value.types), true);
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(
  () => data.value.types,
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
  <div class="business-enterprise">
    <BusinessAsidePanel :describe="describe" title="企业信息">
      <ul class="business-enterprise__cards">
        <li>
          <h2>报税金额</h2>
          <p class="c-warning-secondary">¥{{ data.taxAmount }}</p>
        </li>
        <li>
          <div class="flex-x-between">
            <div>
              <h2>企业数量</h2>
              <p class="c-primary-secondary">{{ data.enterpriseCount }}</p>
            </div>
            <div ref="chartElement" class="business-enterprise__pie" />
          </div>
          <div class="business-enterprise__types">
            <span class="mr-[13px]">
              <i class="bg-primary-secondary" />
              国营企业 {{ stateOwned }}
            </span>
            <span>
              <i class="bg-warning-secondary" />
              私营企业 {{ privateOwned }}
            </span>
          </div>
        </li>
        <li>
          <div class="flex-x-between">
            <h2>总投资金额</h2>
            <span class="font-size-[12px]">环比变化</span>
            <span class="font-size-[12px]">{{ investmentTrendText }}</span>
          </div>
          <p class="c-primary-secondary">¥{{ data.investmentTotal }}</p>
        </li>
        <li>
          <div class="flex-x-between">
            <h2>税收总金额</h2>
            <span class="font-size-[12px]">环比变化</span>
            <span class="font-size-[12px]">{{ taxTrendText }}</span>
          </div>
          <p class="c-primary-secondary">¥{{ data.taxTotal }}</p>
        </li>
      </ul>
    </BusinessAsidePanel>
  </div>
</template>

<style lang="scss" scoped>
.business-enterprise {
  width: 100%;
  height: 354px;

  &__cards {
    display: flex;
    flex-wrap: wrap;
    place-content: flex-start space-between;
    width: 100%;

    li {
      width: 242px;
      height: 124px;
      padding: 9px 16px 0 19px;
      margin: 15px 0 0;
      background: url('@/views/business/images/sidebar/frame-1.png') no-repeat center;
      background-size: cover;

      h2 {
        margin: 0 0 2px;
        font-size: 18px;
      }

      p {
        font-size: 30px;
      }
    }
  }

  &__types {
    width: 100%;
    margin: 4px 0 0;

    span {
      font-size: 13px;
    }

    i {
      display: inline-block;
      width: 9px;
      height: 9px;
      border-radius: 50%;
    }
  }

  &__pie {
    width: 82px;
    height: 82px;
  }
}
</style>
