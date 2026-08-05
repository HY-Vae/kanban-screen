import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { getInsightParkTrade, type InsightParkTrade } from '@/api/insight';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取园区进出口额
 * @param getDate 当前筛选日期
 * @returns 进出口数据与刷新
 */
export function useInsightParkTrade(getDate: () => string) {
  const data = ref<InsightParkTrade>({
    amount: 0,
    importAmount: 0,
    exportAmount: 0,
  });

  async function refresh() {
    data.value = await getInsightParkTrade({ date: getDate() });
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { data, refresh };
}
