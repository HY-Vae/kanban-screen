<script lang="ts" setup>
defineOptions({ name: 'BusinessAsidePanel' });

withDefaults(
  defineProps<{
    title: string;
    describe?: string;
    tag?: string;
  }>(),
  {
    describe: '',
    tag: '',
  }
);
</script>

<template>
  <section class="business-aside-panel">
    <header class="business-aside-panel__header">
      <h1 class="business-aside-panel__title">{{ title }}</h1>
      <div class="business-aside-panel__actions">
        <span v-if="tag" class="business-aside-panel__tag">{{ tag }}</span>
        <slot name="actions" />
        <span v-if="describe" class="business-aside-panel__describe">{{ describe }}</span>
      </div>
    </header>
    <div class="business-aside-panel__body">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.business-aside-panel {
  width: 100%;
  padding: 9px 15px;
  color: #fff;
  background: rgb(14 95 255 / 20%);

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

  &__tag {
    width: 62px;
    height: 26px;
    margin: 0 7px 0 0;
    font-size: 14px;
    line-height: 26px;
    color: #fff;
    text-align: center;
    cursor: default;
    background: rgb(24 69 135 / 55%);
  }

  &__describe {
    font-size: 12px;
    color: var(--kanban-color-info-soft);
  }
}
</style>
