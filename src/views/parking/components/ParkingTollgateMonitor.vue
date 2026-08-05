<script lang="ts" setup>
import ParkingTollgateCard from '@/views/parking/components/ParkingTollgateCard.vue';
import ParkingTrendBadge from '@/views/parking/components/ParkingTrendBadge.vue';
import { useParkingTollgateMonitor } from '@/views/parking/composables/useParkingTollgateMonitor';

defineOptions({ name: 'ParkingTollgateMonitor' });

const { tollgates } = useParkingTollgateMonitor();
</script>

<template>
  <section class="parking-tollgate-monitor">
    <div class="parking-tollgate-monitor__stack">
      <div class="parking-tollgate-monitor__title">
        <h1>卡口车辆监控</h1>
      </div>

      <div class="parking-tollgate-monitor__grid">
        <div v-for="item in tollgates" :key="item.id" class="parking-tollgate-monitor__cell">
          <ParkingTollgateCard :count="item.count" :name="item.name" class="parking-tollgate-monitor__card" />
          <ParkingTrendBadge :trend="item.trend" class="parking-tollgate-monitor__trend" />
        </div>

        <div class="parking-tollgate-monitor__hub">
          <div class="parking-tollgate-monitor__hub-inner">
            <h1>智能管控</h1>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.parking-tollgate-monitor {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 824px;
  height: 650px;
  background: url('@/views/parking/images/bg/bg-middle.png') no-repeat center;
  background-size: cover;

  &__stack {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 570px;
  }

  &__title {
    height: 61px;
    background: url('@/views/parking/images/bg/bg-main-title.png') no-repeat center;
    background-size: cover;

    h1 {
      font-size: 22px;
      color: #fff;
      text-align: center;
    }
  }

  &__grid {
    position: relative;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    width: 666px;
    height: 400px;
    margin: 28px 0 77px;
    background: url('@/views/parking/images/bg/bg-main-1.png') no-repeat center;
    background-size: cover;
  }

  &__cell {
    position: relative;
  }

  &__card {
    position: absolute;
    top: 37px;
    left: 40px;
    width: 175px;
  }

  &__trend {
    top: 73px;
    left: 193px;
  }

  &__hub {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 138px;
    height: 138px;
    transform: translate(-50%, -50%);
  }

  &__hub-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 19px;
    background: url('@/views/parking/images/bg/bg-main-center.png');
    background-size: cover;
    animation: rotate 30s linear infinite;

    h1 {
      width: 53px;
      color: var(--kanban-color-accent);
      text-align: center;
      animation: rotate-reverse 30s linear infinite;
    }
  }
}
</style>
