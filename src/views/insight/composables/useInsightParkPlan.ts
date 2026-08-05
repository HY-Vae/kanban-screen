import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import type { ChartSeries } from '@/api/common';
import { getInsightParkPlan } from '@/api/insight';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取园区规划趋势
 * @returns 入园/出园序列与刷新
 */
export function useInsightParkPlan() {
  const series = ref<ChartSeries[]>([]);

  async function refresh() {
    series.value = await getInsightParkPlan();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { series, refresh };
}
