import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import {
  type CommunityDevicesStatus,
  type CommunityPopulationCard,
  getCommunityDevicesStatus,
  getCommunityPopulationStats,
} from '@/api/community';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取并定时刷新中心舞台（人口统计 + 设备状态）
 * @returns 人口卡片、设备状态与手动刷新
 */
export function useCommunityPopulationStage() {
  const populationCards = ref<CommunityPopulationCard[]>([]);
  const deviceStatus = ref<CommunityDevicesStatus>({ metrics: [], securityIndex: 0 });

  async function refresh() {
    const [cards, status] = await Promise.all([getCommunityPopulationStats(), getCommunityDevicesStatus()]);
    populationCards.value = cards;
    deviceStatus.value = status;
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { populationCards, deviceStatus, refresh };
}
