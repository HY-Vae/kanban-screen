import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { getInsightYearIncome, type InsightYearIncome } from '@/api/insight';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取年度经营收入
 * @returns 收入列表与刷新
 */
export function useInsightYearIncome() {
  const data = ref<InsightYearIncome>({
    list: [],
    endTime: Date.now(),
  });

  async function refresh() {
    data.value = await getInsightYearIncome();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { data, refresh };
}
