import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { getAnalyseShareRatio } from '@/api/analyse';
import type { NamedValue } from '@/api/common';

const REFRESH_INTERVAL_MS = 10000;

/**
 * 拉取并定时刷新数据占有率
 * @returns 占有率列表与手动刷新
 */
export function useAnalyseDataShare() {
  const shares = ref<NamedValue[]>([]);

  async function refresh() {
    shares.value = await getAnalyseShareRatio();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { shares, refresh };
}
