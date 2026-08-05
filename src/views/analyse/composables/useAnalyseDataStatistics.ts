import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { getAnalyseShowStatistics } from '@/api/analyse';
import type { NamedValue } from '@/api/common';

const REFRESH_INTERVAL_MS = 10000;

/**
 * 拉取并定时刷新数据展示统计
 * @returns 统计列表与手动刷新
 */
export function useAnalyseDataStatistics() {
  const statistics = ref<NamedValue[]>([]);

  async function refresh() {
    statistics.value = await getAnalyseShowStatistics();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { statistics, refresh };
}
