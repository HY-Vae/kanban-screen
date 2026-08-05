<script lang="ts" setup>
import { useTimeoutFn } from '@vueuse/core';
import { ref } from 'vue';

import KanbanScreen from '@/components/kanban/KanbanScreen';
import ParkingFooterNav from '@/views/parking/components/ParkingFooterNav.vue';
import ParkingRoadStatus from '@/views/parking/components/ParkingRoadStatus.vue';
import ParkingTollgateMonitor from '@/views/parking/components/ParkingTollgateMonitor.vue';
import ParkingTrafficOverview from '@/views/parking/components/ParkingTrafficOverview.vue';

defineOptions({ name: 'ParkingScreen' });

const showNavigationArrows = ref(false);
let hideArrowsTimeout: (() => void) | null = null;

function handleMouseMovement() {
  showNavigationArrows.value = true;

  if (hideArrowsTimeout) {
    hideArrowsTimeout();
  }

  const { start, stop } = useTimeoutFn(() => {
    showNavigationArrows.value = false;
  }, 2000);

  hideArrowsTimeout = stop;
  start();
}
</script>

<template>
  <div class="parking" @mousemove="handleMouseMovement">
    <div v-show="showNavigationArrows" class="parking__nav-prev">
      <img alt="上一屏" src="@/views/parking/images/arrow/arrow-left.png" />
    </div>

    <!--
      停车屏是「居中紧凑三栏」+ 透视切图，不是满宽 space-between。
      尺寸 / 排布由本屏决定，壳只提供槽位。
    -->
    <KanbanScreen
      align="center"
      center-width="824px"
      gap="20px"
      justify="center"
      left-width="380px"
      padding-x="0"
      padding-y="78px"
      right-width="380px"
    >
      <template #left>
        <ParkingRoadStatus />
      </template>
      <template #center>
        <ParkingTollgateMonitor />
      </template>
      <template #right>
        <ParkingTrafficOverview />
      </template>
      <template #footer>
        <ParkingFooterNav />
      </template>
    </KanbanScreen>

    <div v-show="showNavigationArrows" class="parking__nav-next">
      <img alt="下一屏" src="@/views/parking/images/arrow/arrow-right.png" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.parking {
  position: relative;
  width: 100%;
  height: 100%;

  &__nav-prev,
  &__nav-next {
    position: absolute;
    top: 50%;
    z-index: 2;
    cursor: pointer;
    transform: translateY(-50%);

    img {
      width: 65px;
    }
  }

  &__nav-prev {
    left: 38px;
  }

  &__nav-next {
    right: 38px;
  }
}
</style>
