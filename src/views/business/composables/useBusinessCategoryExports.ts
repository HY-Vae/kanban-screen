import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { type BusinessCategoryExport, getBusinessCategoryExports } from '@/api/business';

const REFRESH_INTERVAL_MS = 3000;

/**
 * 拉取品类出口列表
 * @returns 品类列表与刷新
 */
export function useBusinessCategoryExports() {
  const list = ref<BusinessCategoryExport[]>([]);

  async function refresh() {
    list.value = await getBusinessCategoryExports();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { list, refresh };
}
