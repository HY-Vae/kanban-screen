import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { getInsightParkAreas, type InsightParkArea } from '@/api/insight';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取园区面积规划
 * @returns 面积卡片与刷新
 */
export function useInsightParkAreas() {
  const list = ref<InsightParkArea[]>([]);

  async function refresh() {
    list.value = await getInsightParkAreas();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { list, refresh };
}
