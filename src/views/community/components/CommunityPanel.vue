<script lang="ts" setup>
defineOptions({ name: 'CommunityPanel' });

defineProps<{
  title?: string;
}>();
</script>

<template>
  <div class="community-panel">
    <h1 class="community-panel__title">{{ title }}</h1>
    <div class="community-panel__body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.community-panel {
  margin: 0 auto;
  width: 430px;
  height: 440px;
  background: url('../images/bg-common-panel.png') no-repeat center;
  background-size: cover;

  &__title {
    font-size: 20px;
    line-height: 85px;
    color: var(--kanban-color-brand-5);
    text-align: center;
  }

  &__body {
    display: flex;
    width: 368px;
    height: 314px;
    margin: 0 auto;
  }
}
</style>
