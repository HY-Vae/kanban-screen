import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { type AnalyseDeviceSalesStats, getAnalyseDeviceSalesStats } from '@/api/analyse';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取并定时刷新销售设备总量
 * @returns 销量统计与手动刷新
 */
export function useAnalyseDeviceSales() {
  const stats = ref<AnalyseDeviceSalesStats>({
    totalDeviceSales: 0,
    yearlyGrowthRate: 0,
  });

  async function refresh() {
    stats.value = await getAnalyseDeviceSalesStats();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { stats, refresh };
}
