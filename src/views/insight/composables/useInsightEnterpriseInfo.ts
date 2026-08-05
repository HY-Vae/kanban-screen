import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { getInsightEnterpriseInfo, type InsightEnterpriseInfo } from '@/api/insight';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取企业信息
 * @returns 企业概览与刷新
 */
export function useInsightEnterpriseInfo() {
  const data = ref<InsightEnterpriseInfo>({
    taxAmount: 0,
    taxTotal: 0,
    taxTrend: 0,
    enterpriseCount: 0,
    types: [],
    investmentTotal: 0,
    investmentTrend: 0,
    asOf: '',
  });

  async function refresh() {
    data.value = await getInsightEnterpriseInfo();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { data, refresh };
}
