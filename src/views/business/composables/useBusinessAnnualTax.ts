import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { type BusinessAnnualTax, getBusinessAnnualTax } from '@/api/business';

const REFRESH_INTERVAL_MS = 3000;

/**
 * 拉取年度税收序列
 * @returns 税收数据与刷新
 */
export function useBusinessAnnualTax() {
  const data = ref<BusinessAnnualTax>({ unit: '', periods: [], series: [] });

  async function refresh() {
    data.value = await getBusinessAnnualTax();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { data, refresh };
}
