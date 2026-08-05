import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { getAnalyseShowcaseMetrics } from '@/api/analyse';
import type { NamedValue } from '@/api/common';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取并定时刷新中部展示指标
 * @returns 指标列表与手动刷新
 */
export function useAnalyseShowcaseMetrics() {
  const metrics = ref<NamedValue[]>([]);

  async function refresh() {
    metrics.value = await getAnalyseShowcaseMetrics();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { metrics, refresh };
}
