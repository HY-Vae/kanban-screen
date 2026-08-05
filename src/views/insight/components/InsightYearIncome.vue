<script lang="ts" setup>
import dayjs from 'dayjs';
import { computed } from 'vue';

import { formatter } from '@/utils/chart';
import InsightAsidePanel from '@/views/insight/components/InsightAsidePanel.vue';
import InsightIncomeProgress from '@/views/insight/components/InsightIncomeProgress.vue';
import { useInsightYearIncome } from '@/views/insight/composables/useInsightYearIncome';

defineOptions({ name: 'InsightYearIncome' });

const { data } = useInsightYearIncome();

const describe = computed(() => `截止时间至 ${dayjs(data.value.endTime).format('YYYY-MM-DD')}`);
</script>

<template>
  <div class="insight-year-income">
    <InsightAsidePanel :describe="describe" title="本年经营收入">
      <ul class="insight-year-income__list">
        <li v-for="item in data.list" :key="item.id">
          <div>
            <h2>{{ item.title }}</h2>
            <em>¥ {{ formatter(item.amount) }}</em>
          </div>
          <InsightIncomeProgress :percent="item.percent" class="insight-year-income__progress" />
        </li>
      </ul>
    </InsightAsidePanel>
  </div>
</template>

<style lang="scss" scoped>
.insight-year-income {
  width: 100%;
  height: 389px;

  &__list {
    display: flex;
    flex-wrap: wrap;
    place-content: space-between space-between;
    width: 100%;
    height: 300px;
    margin: 18px 0 0;
  }

  li {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 248px;
    height: 143px;
    padding: 0 18px 0 14px;
    background: url('@/views/insight/images/bg-middle.png') no-repeat center;
    background-size: cover;

    h2 {
      font-size: 18px;
    }

    em {
      font-size: 28px;
      font-style: normal;
      color: var(--kanban-color-warning-soft);
    }
  }

  &__progress {
    position: absolute;
    top: -10px;
    right: -5px;
  }
}
</style>
