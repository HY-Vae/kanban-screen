import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { getInsightRevenueOverview } from '@/api/insight';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取税收概览月度序列
 * @returns 月度金额与刷新
 */
export function useInsightRevenueOverview() {
  const values = ref<number[]>([]);

  async function refresh() {
    values.value = await getInsightRevenueOverview();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { values, refresh };
}
