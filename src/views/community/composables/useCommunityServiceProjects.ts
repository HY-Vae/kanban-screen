import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { type CommunityServiceProject, getCommunityServiceProjects } from '@/api/community';

const REFRESH_INTERVAL_MS = 1000;

/**
 * 拉取并定时刷新服务项目进度
 * @returns 项目列表与手动刷新
 */
export function useCommunityServiceProjects() {
  const projects = ref<CommunityServiceProject[]>([]);

  async function refresh() {
    projects.value = await getCommunityServiceProjects();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { projects, refresh };
}
