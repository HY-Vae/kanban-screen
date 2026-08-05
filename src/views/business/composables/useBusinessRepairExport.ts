import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { type BusinessRepairExport, getBusinessRepairExport } from '@/api/business';

const REFRESH_INTERVAL_MS = 3000;

/**
 * 拉取维修业务出口
 * @returns 维修出口与刷新
 */
export function useBusinessRepairExport() {
  const data = ref<BusinessRepairExport>({
    total: 0,
    label: '',
    periods: [],
    metrics: [],
  });

  async function refresh() {
    data.value = await getBusinessRepairExport();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { data, refresh };
}
