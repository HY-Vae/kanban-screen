import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { type BusinessImportExport, getBusinessImportExport } from '@/api/business';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取园区进出口额
 * @returns 进出口数据与刷新
 */
export function useBusinessImportExport() {
  const data = ref<BusinessImportExport>({
    totalDisplay: '0',
    importAmount: 0,
    exportAmount: 0,
    importBar: 0,
    exportBar: 0,
    periods: [],
  });

  async function refresh() {
    data.value = await getBusinessImportExport();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { data, refresh };
}
