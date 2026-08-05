<script lang="ts" setup>
defineOptions({ name: 'ProgressBar' });
defineProps({
  progress: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div class="progress">
    <div :style="{ width: `${progress}%` }" class="progress-inner" />
  </div>
</template>

<style lang="scss" scoped>
.progress {
  width: 100%;
  height: 11px;
  border: 1px solid var(--kanban-color-accent);
  border-radius: 2px;

  &-inner {
    height: 100%;
    background: var(--kanban-color-brand);
    border-radius: 4px;
    transition: all 0.4s;
  }
}
</style>
