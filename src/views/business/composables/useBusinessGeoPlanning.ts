import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { type BusinessGeoPlanning, getBusinessGeoPlanning } from '@/api/business';

const REFRESH_INTERVAL_MS = 3000;

/**
 * 拉取地理规划指标
 * @returns 地理规划与刷新
 */
export function useBusinessGeoPlanning() {
  const data = ref<BusinessGeoPlanning>({ asOf: '', rows: [] });

  async function refresh() {
    data.value = await getBusinessGeoPlanning();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { data, refresh };
}
