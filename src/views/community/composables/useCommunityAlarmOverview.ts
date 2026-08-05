import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { type CommunityAlarmsOverview, getCommunityAlarmsOverview } from '@/api/community';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取并定时刷新预警概览
 * @returns 预警数据与手动刷新
 */
export function useCommunityAlarmOverview() {
  const alarms = ref<CommunityAlarmsOverview>({ total: 0, list: [] });

  async function refresh() {
    alarms.value = await getCommunityAlarmsOverview();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { alarms, refresh };
}
