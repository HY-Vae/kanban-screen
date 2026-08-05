import { useIntervalFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { type BusinessParkAsset, getBusinessParkAssets } from '@/api/business';

const REFRESH_INTERVAL_MS = 3000;

/**
 * 拉取园区资产展示
 * @returns 资产列表与刷新
 */
export function useBusinessParkAssets() {
  const assets = ref<BusinessParkAsset[]>([]);

  async function refresh() {
    assets.value = await getBusinessParkAssets();
  }

  onMounted(() => {
    void refresh();
    useIntervalFn(() => {
      void refresh();
    }, REFRESH_INTERVAL_MS);
  });

  return { assets, refresh };
}
