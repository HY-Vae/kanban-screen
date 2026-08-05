import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { getParkingRoadStatus, type ParkingRoadEntrance } from '@/api/parking';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取并定时刷新道路卡口状态
 * @returns 卡口列表、调度建议与手动刷新
 */
export function useParkingRoadStatus() {
  const entrances = ref<ParkingRoadEntrance[]>([]);
  const suggest = ref('');

  async function refresh() {
    const result = await getParkingRoadStatus();
    entrances.value = result.entrances;
    suggest.value = result.suggest;
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { entrances, suggest, refresh };
}
