import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { getParkingTollgateMonitor, type ParkingTollgateMonitor } from '@/api/parking';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取并定时刷新卡口车辆监控
 * @returns 监控列表与手动刷新
 */
export function useParkingTollgateMonitor() {
  const tollgates = ref<ParkingTollgateMonitor[]>([]);

  async function refresh() {
    tollgates.value = await getParkingTollgateMonitor();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { tollgates, refresh };
}
