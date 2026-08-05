<script lang="ts" setup>
defineOptions({ name: 'ParkingFooterNav' });

const NAV_ITEMS = [
  { id: 'vehicle-1', label: '车辆管理' },
  { id: 'vehicle-2', label: '车辆管理' },
  { id: 'vehicle-3', label: '车辆管理' },
  { id: 'vehicle-4', label: '车辆管理' },
  { id: 'vehicle-5', label: '车辆管理' },
] as const;
</script>

<template>
  <nav class="parking-footer-nav">
    <ul class="parking-footer-nav__list">
      <li v-for="item in NAV_ITEMS" :key="item.id" class="parking-footer-nav__item">
        <img alt="车辆管理" src="@/views/parking/images/car/car-39.png" />
        <span>{{ item.label }}</span>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.parking-footer-nav {
  width: 772px;
  height: 125px;
  margin: 66px auto auto;

  &__list {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 138px;
    height: 125px;
    background: rgb(16 11 87 / 55%);
    border-radius: 10px;

    img {
      width: 67px;
      height: 67px;
    }

    span {
      font-size: 15px;
      font-weight: lighter;
      color: #fff;
    }
  }
}
</style>
