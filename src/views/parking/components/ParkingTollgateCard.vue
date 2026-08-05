<script lang="ts" setup>
defineOptions({ name: 'ParkingTollgateCard' });

defineProps<{
  count: number;
  name: string;
}>();
</script>

<template>
  <div class="parking-tollgate-card">
    <h1 class="parking-tollgate-card__count">{{ count }}</h1>
    <div class="parking-tollgate-card__hint">今日 进出车辆数/辆</div>
    <div class="parking-tollgate-card__name">{{ name }}</div>
    <div class="parking-tollgate-card__action">
      <span class="parking-tollgate-card__link">查看</span>
      <img alt="arrow-item" class="parking-tollgate-card__arrow" src="@/views/parking/images/arrow/arrow-item.png" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.parking-tollgate-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  &__count {
    font-size: 34px;
    color: var(--kanban-color-accent);
  }

  &__hint {
    margin-top: -12px;
    font-size: 16px;
    color: #fff;
  }

  &__name {
    margin-top: 7px;
    font-size: 18px;
    color: var(--kanban-color-brand);
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    color: var(--kanban-color-brand);
  }

  &__link {
    float: left;
    font-size: 14px;
    color: var(--kanban-color-accent);
    cursor: pointer;
  }

  &__arrow {
    float: left;
    height: 16px;
  }
}
</style>
