import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { type BusinessForeignTradeCard, getBusinessForeignTrade } from '@/api/business';

const REFRESH_INTERVAL_MS = 3000;

/**
 * 拉取涉外贸易卡片（含迷你图轮询）
 * @returns 卡片列表与刷新
 */
export function useBusinessForeignTrade() {
  const cards = ref<BusinessForeignTradeCard[]>([]);

  async function refresh() {
    cards.value = await getBusinessForeignTrade();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { cards, refresh };
}
