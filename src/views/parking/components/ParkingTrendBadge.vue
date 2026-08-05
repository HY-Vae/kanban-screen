<script lang="ts" setup>
import { computed } from 'vue';

import ArrowDown from '@/views/parking/images/arrow/arrow-down.png';
import ArrowUp from '@/views/parking/images/arrow/arrow-up.png';

defineOptions({ name: 'ParkingTrendBadge' });

const props = defineProps<{
  trend: number;
}>();

const isRising = computed(() => props.trend > 25);
const arrowSource = computed(() => (isRising.value ? ArrowUp : ArrowDown));
const toneClass = computed(() =>
  isRising.value ? 'parking-trend-badge__value--warning' : 'parking-trend-badge__value--accent'
);
</script>

<template>
  <div class="parking-trend-badge">
    <div class="parking-trend-badge__inner">
      <div :class="toneClass" class="parking-trend-badge__row">
        <img :src="arrowSource" alt="arrow" class="parking-trend-badge__arrow" />
        <span class="parking-trend-badge__percent">{{ trend }}%</span>
      </div>
      <span class="parking-trend-badge__label">环比</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.parking-trend-badge {
  position: absolute;
  width: 86px;
  height: 86px;
  background: url('@/assets/images/common/bg/bg-main-2.png') no-repeat center;
  background-size: cover;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin: 16px 13px 20px;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__arrow {
    width: 13px;
    height: 23px;
    margin-top: 6px;
  }

  &__percent {
    font-size: 15px;
  }

  &__value--warning {
    color: var(--kanban-color-warning);
  }

  &__value--accent {
    color: var(--kanban-color-accent);
  }

  &__label {
    font-size: 15px;
    text-align: center;
    color: var(--kanban-color-info);
  }
}
</style>
