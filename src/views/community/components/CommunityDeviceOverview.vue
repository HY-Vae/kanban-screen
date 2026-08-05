<script lang="ts" setup>
import { computed } from 'vue';

import type { CommunityDeviceCategory } from '@/api/community';
import DigitalNumber from '@/components/DigitalNumber/DigitalNumber';
import CommunityDeviceRatioBar from '@/views/community/components/CommunityDeviceRatioBar.vue';
import CommunityPanel from '@/views/community/components/CommunityPanel.vue';
import { useCommunityDeviceOverview } from '@/views/community/composables/useCommunityDeviceOverview';

defineOptions({ name: 'CommunityDeviceOverview' });

const { devices } = useCommunityDeviceOverview();

function toPercents(item: CommunityDeviceCategory) {
  const sum = item.internal + item.connected;
  if (sum <= 0) {
    return { internalPercent: 0, connectedPercent: 0 };
  }

  const internalPercent = Math.round((item.internal / sum) * 100);
  return {
    internalPercent,
    connectedPercent: 100 - internalPercent,
  };
}

const categories = computed(() =>
  devices.value.list.map((item) => ({
    ...item,
    ...toPercents(item),
  }))
);
</script>

<template>
  <div class="community-device-overview">
    <CommunityPanel title="设备总数">
      <div class="community-device-overview__body">
        <DigitalNumber :money="devices.total" />

        <div v-for="item in categories" :key="item.id" class="community-device-overview__row">
          <CommunityDeviceRatioBar
            :connected-percent="item.connectedPercent"
            :internal-percent="item.internalPercent"
          />
          <div class="community-device-overview__meta">
            <span>{{ item.name }}</span>
            <span>内部设备{{ item.internal }} 接入设备{{ item.connected }}</span>
          </div>
        </div>
      </div>
    </CommunityPanel>
  </div>
</template>

<style lang="scss" scoped>
.community-device-overview {
  width: 100%;
  padding: 9px 15px;
  background: rgb(14 95 255 / 20%);

  &__body {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    width: 100%;
    height: 100%;
  }

  &__row {
    width: 100%;
    margin-top: 14px;
    color: #fff;
  }

  &__meta {
    display: flex;
    justify-content: space-between;
  }

  :deep(.mb-\[20px\] span) {
    float: left;
    width: 64px;
    height: 68px;
    margin: 0 11px 0 0;
    font-size: 50px;
    line-height: 68px;
    text-align: center;
    background: url('@/views/community/images/digital-number.png');
  }
}
</style>
