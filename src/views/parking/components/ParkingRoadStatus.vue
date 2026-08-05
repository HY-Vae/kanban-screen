<script lang="ts" setup>
import { useParkingRoadStatus } from '@/views/parking/composables/useParkingRoadStatus';

defineOptions({ name: 'ParkingRoadStatus' });

const { entrances, suggest } = useParkingRoadStatus();
</script>

<template>
  <aside class="parking-road-status">
    <div class="parking-road-status__mirror">
      <div class="parking-road-status__title">
        <h1>实时道路情况</h1>
      </div>

      <ul class="parking-road-status__list">
        <li v-for="item in entrances" :key="item.id" class="parking-road-status__item">
          <div v-show="item.status === '畅通'" class="parking-road-status__row">
            <img alt="畅通" src="@/views/parking/images/car/car-1.png" />
            <p>{{ item.name }}</p>
            <span class="parking-road-status__badge parking-road-status__badge--clear">
              {{ item.status }}
            </span>
          </div>

          <div v-show="item.status === '拥堵'" class="parking-road-status__row">
            <img alt="拥堵" src="@/views/parking/images/car/car-2.png" />
            <p>{{ item.name }}</p>
            <span class="parking-road-status__badge parking-road-status__badge--jam">
              {{ item.status }}
            </span>
          </div>
        </li>
      </ul>

      <div class="parking-road-status__suggest">
        <h5>车流量建议</h5>
        <p v-html="suggest" />
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.parking-road-status {
  width: 380px;
  height: 650px;
  background: url('@/views/parking/images/bg/bg-side.png') no-repeat center;
  background-size: cover;
  transform: rotateY(180deg);
  transform-style: preserve-3d;

  &__mirror {
    padding: 55px 0 0 25px;
    transform: rotateY(180deg);
  }

  &__title {
    width: 218px;
    height: 59px;
    background: url('@/views/parking/images/bg/bg-road-condition.png') no-repeat center;
    background-size: cover;

    h1 {
      font-size: 18px;
      color: #fff;
    }
  }

  &__list {
    margin-top: 32px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 330px;
    height: 61px;
    margin: 0 0 9px;
    background: url('@/views/parking/images/bg/bg-frame.png') no-repeat center;
    background-size: cover;

    img {
      width: 60px;
    }

    p {
      font-size: 14px;
      color: #fff;
    }
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &--clear {
      color: var(--kanban-color-accent);
      border-bottom-color: var(--kanban-color-accent);
    }

    &--jam {
      color: var(--kanban-color-warning);
      border-bottom-color: var(--kanban-color-warning);
    }
  }

  &__suggest {
    width: 330px;
    height: 157px;
    padding: 15px 14px 17px 20px;
    margin: 24px 0 0;
    font-size: 14px;
    color: #fff;
    background: url('@/views/parking/images/bg/bg-suggest.png') no-repeat center;
    background-size: cover;

    :deep(span) {
      color: var(--kanban-color-warning-soft);
    }
  }
}
</style>
