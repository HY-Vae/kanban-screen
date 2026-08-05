<script lang="ts" setup>
import { computed } from 'vue';

import type { KanbanPanelProps } from './types';

defineOptions({ name: 'KanbanPanel' });

const props = withDefaults(defineProps<KanbanPanelProps>(), {
  title: '',
  width: '430px',
  height: '440px',
  bodyWidth: '368px',
  bodyHeight: '314px',
  backgroundImage: '',
});

const panelStyle = computed(() => {
  const style: Record<string, string> = {
    width: props.width,
    height: props.height,
  };
  if (props.backgroundImage) {
    style.backgroundImage = `url(${props.backgroundImage})`;
    style.backgroundRepeat = 'no-repeat';
    style.backgroundPosition = 'center';
    style.backgroundSize = 'cover';
  }
  return style;
});

const bodyStyle = computed(() => ({
  width: props.bodyWidth,
  height: props.bodyHeight,
}));
</script>

<template>
  <section :style="panelStyle" class="kanban-panel">
    <h2 v-if="title" class="kanban-panel__title">{{ title }}</h2>
    <div :style="bodyStyle" class="kanban-panel__body">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.kanban-panel {
  background-color: var(--kanban-bg-panel);

  &__title {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    line-height: 85px;
    color: var(--kanban-color-brand-5);
    text-align: center;
  }

  &__body {
    display: flex;
    justify-content: center;
    margin-inline: auto;
  }
}
</style>
