<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';

import DigitalNumber from '@/components/DigitalNumber/DigitalNumber';
import TimeSelect from '@/components/TimeSelect/index.vue';
import type { TimeSelectType } from '@/components/TimeSelect/type';
import InsightAsidePanel from '@/views/insight/components/InsightAsidePanel.vue';
import { useInsightScaleBenefit } from '@/views/insight/composables/useInsightScaleBenefit';

defineOptions({ name: 'InsightScaleBenefit' });

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

const { data, refresh } = useInsightScaleBenefit(() => form.date);

const dateModel = computed({
  get: () => form.date,
  set: (value: string) => {
    form.date = value;
    void refresh();
  },
});
</script>

<template>
  <div class="insight-scale">
    <InsightAsidePanel title="规模效益">
      <template #actions>
        <TimeSelect v-model="dateModel" :time-list="TIME_LIST" />
      </template>

      <ul class="insight-scale__list">
        <li>
          <div class="insight-scale__meta">
            <h2>进出口总值</h2>
            <div>
              <span>
                总值增幅
                <em>+{{ data.totalGrowth }}%</em>
              </span>
              <span>
                超越第二名
                <em>+{{ data.rankGap }}%</em>
              </span>
            </div>
          </div>
          <div class="money-digit">
            <DigitalNumber :money="data.income" :separator="true" />
          </div>
        </li>

        <li>
          <div class="insight-scale__meta">
            <h2>进出口总值</h2>
            <div>
              <span>
                环比变化
                <em>+{{ data.expendChain }}%</em>
              </span>
            </div>
          </div>
          <div class="money-digit">
            <DigitalNumber :money="data.expend" :separator="true" />
          </div>
        </li>
      </ul>
    </InsightAsidePanel>
  </div>
</template>

<style lang="scss" scoped>
.insight-scale {
  width: 100%;
  height: 274px;

  &__list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 198px;

    li {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 9px 0 0;
    }
  }

  &__meta {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 0 5px;

    h2 {
      font-size: 18px;
    }

    span {
      margin: 0 4px 0 0;
      font-size: 12px;
    }

    em {
      font-size: 14px;
      font-style: normal;
      color: var(--kanban-color-success);
    }
  }
}
</style>
