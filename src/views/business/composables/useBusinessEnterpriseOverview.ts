import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { type BusinessEnterpriseOverview, getBusinessEnterpriseOverview } from '@/api/business';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取企业信息概览
 * @returns 企业概览与刷新
 */
export function useBusinessEnterpriseOverview() {
  const data = ref<BusinessEnterpriseOverview>({
    taxAmount: 0,
    enterpriseCount: 0,
    types: [],
    investmentTotal: 0,
    investmentTrend: 0,
    taxTotal: 0,
    taxTrend: 0,
    asOf: '',
  });

  async function refresh() {
    data.value = await getBusinessEnterpriseOverview();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { data, refresh };
}
