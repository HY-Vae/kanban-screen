<script lang="ts" setup>
defineOptions({ name: 'AnalysePanelTitle' });

defineProps<{
  title?: string;
}>();
</script>

<template>
  <h1 class="analyse-panel-title">{{ title }}</h1>
</template>

<style lang="scss" scoped>
.analyse-panel-title {
  position: relative;
  font-size: 20px;
  line-height: 40px;
  color: #fff;

  &::before {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    content: '';
    background: #707070;
  }

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 38%;
    height: 2px;
    content: '';
    background: var(--kanban-color-accent);
  }
}
</style>
