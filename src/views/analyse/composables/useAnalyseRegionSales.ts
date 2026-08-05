import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { getAnalyseRegionSalesRatio } from '@/api/analyse';
import type { NamedValue } from '@/api/common';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取并定时刷新区域销量占比
 * @returns 城市销量与手动刷新
 */
export function useAnalyseRegionSales() {
  const regions = ref<NamedValue[]>([]);

  async function refresh() {
    regions.value = await getAnalyseRegionSalesRatio();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { regions, refresh };
}
