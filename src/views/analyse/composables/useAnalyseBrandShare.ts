import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { getAnalyseBrandsDistribution } from '@/api/analyse';
import type { NamedValue } from '@/api/common';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取并定时刷新品牌占有率
 * @returns 品牌占比与手动刷新
 */
export function useAnalyseBrandShare() {
  const brands = ref<NamedValue[]>([]);

  async function refresh() {
    brands.value = await getAnalyseBrandsDistribution();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { brands, refresh };
}
