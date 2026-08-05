<script lang="ts" setup>
defineOptions({ name: 'InsightAsidePanel' });

withDefaults(
  defineProps<{
    title: string;
    describe?: string;
  }>(),
  {
    describe: '',
  }
);
</script>

<template>
  <section class="insight-aside-panel">
    <header class="insight-aside-panel__header">
      <h1 class="insight-aside-panel__title">{{ title }}</h1>
      <div class="insight-aside-panel__actions">
        <slot name="actions" />
        <span v-if="describe" class="insight-aside-panel__describe">{{ describe }}</span>
      </div>
    </header>
    <div class="insight-aside-panel__body">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.insight-aside-panel {
  width: 100%;
  padding: 9px 15px;
  color: #fff;
  background: rgb(18 41 83 / 70%);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    width: 172px;
    height: 42px;
    font-size: 22px;
    color: #fff;
    background: url('@/assets/images/common/bg/bg-frame-4.png') no-repeat;
    background-size: cover;
  }

  &__actions {
    display: flex;
    align-items: center;
  }

  &__describe {
    font-size: 12px;
    color: var(--kanban-color-info-soft);
  }
}
</style>
