import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { type BusinessDailyTradeCard, getBusinessDailyTrade } from '@/api/business';

const REFRESH_INTERVAL_MS = 3000;

/**
 * 拉取今日交易卡片
 * @returns 卡片列表与刷新
 */
export function useBusinessDailyTrade() {
  const cards = ref<BusinessDailyTradeCard[]>([]);

  async function refresh() {
    cards.value = await getBusinessDailyTrade();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { cards, refresh };
}
