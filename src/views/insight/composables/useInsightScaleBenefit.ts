import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { getInsightScaleBenefit, type InsightScaleBenefit } from '@/api/insight';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取规模效益
 * @param getDate 当前筛选日期
 * @returns 规模效益与刷新
 */
export function useInsightScaleBenefit(getDate: () => string) {
  const data = ref<InsightScaleBenefit>({
    totalGrowth: 0,
    income: 0,
    rankGap: 0,
    expend: 0,
    expendChain: 0,
  });

  async function refresh() {
    data.value = await getInsightScaleBenefit({ date: getDate() });
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { data, refresh };
}
