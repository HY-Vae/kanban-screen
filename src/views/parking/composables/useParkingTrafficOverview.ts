import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import type { ChartSeries, MetricCard } from '@/api/common';
import { getParkingTrafficStatistics } from '@/api/parking';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取并定时刷新车流量概览
 * @returns 指标卡、图表序列与手动刷新
 */
export function useParkingTrafficOverview() {
  const overview = ref<MetricCard[]>([]);
  const series = ref<ChartSeries[]>([]);

  async function refresh() {
    const result = await getParkingTrafficStatistics();
    overview.value = result.overview;
    series.value = result.series;
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { overview, series, refresh };
}
