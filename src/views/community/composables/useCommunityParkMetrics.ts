import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import type { NamedValueRow } from '@/api/common';
import { getCommunityParkMetrics } from '@/api/community';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取并定时刷新园区指标玫瑰图
 * @returns 指标列表与手动刷新
 */
export function useCommunityParkMetrics() {
  const metrics = ref<NamedValueRow[]>([]);

  async function refresh() {
    metrics.value = await getCommunityParkMetrics();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { metrics, refresh };
}
