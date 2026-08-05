<script lang="ts" setup>
import { useAnalyseDeviceSales } from '@/views/analyse/composables/useAnalyseDeviceSales';

defineOptions({ name: 'AnalyseDeviceSalesTotal' });

const { stats } = useAnalyseDeviceSales();
</script>

<template>
  <div class="analyse-device-sales-total">
    <div>
      <h1 class="font-size-[21px]">销售设备总量(台)</h1>
      <div class="analyse-device-sales-total__percent">
        <span>环比去年增长 {{ stats.yearlyGrowthRate }} %</span>
        <i class="i-mdi-trending-up" />
      </div>
    </div>

    <ul class="flex">
      <li v-for="(digit, digitIndex) in stats.totalDeviceSales.toString()" :key="`${digit}-${digitIndex}`">
        {{ digit }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.analyse-device-sales-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  color: #fff;

  &__percent {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: var(--kanban-color-accent);

    span {
      font-size: 18px;
    }

    i {
      font-size: 21px;
    }
  }

  li {
    width: 56px;
    height: 53px;
    margin: 0 4px;
    font-size: 47px;
    line-height: 53px;
    text-align: center;
    background-color: rgb(39 63 86 / 34%);
    border: 1px solid var(--kanban-color-accent);
  }
}
</style>
