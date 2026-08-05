import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { getAnalyseBrandShowcase } from '@/api/analyse';
import type { NamedValue } from '@/api/common';

const REFRESH_INTERVAL_MS = 10000;

/**
 * 拉取并定时刷新品牌分析展示
 * @returns 品牌分析与手动刷新
 */
export function useAnalyseBrandShowcase() {
  const brands = ref<NamedValue[]>([]);

  async function refresh() {
    brands.value = await getAnalyseBrandShowcase();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { brands, refresh };
}
