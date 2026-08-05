import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { type AnalyseCompanySalesItem, getAnalyseCompanySalesDistribution } from '@/api/analyse';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取并定时刷新公司销量占比
 * @returns 公司列表与手动刷新
 */
export function useAnalyseCompanySales() {
  const companies = ref<AnalyseCompanySalesItem[]>([]);

  async function refresh() {
    companies.value = await getAnalyseCompanySalesDistribution();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { companies, refresh };
}
