import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { type CommunityDevicesAmount, getCommunityDevicesAmount } from '@/api/community';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取并定时刷新设备数量概览
 * @returns 设备汇总与手动刷新
 */
export function useCommunityDeviceOverview() {
  const devices = ref<CommunityDevicesAmount>({ total: 0, list: [] });

  async function refresh() {
    devices.value = await getCommunityDevicesAmount();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { devices, refresh };
}
