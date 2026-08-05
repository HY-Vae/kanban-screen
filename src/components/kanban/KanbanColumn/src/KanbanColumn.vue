<script lang="ts" setup>
import { computed } from 'vue';

import type { KanbanColumnProps } from './types';

defineOptions({ name: 'KanbanColumn' });

const props = withDefaults(defineProps<KanbanColumnProps>(), {
  width: 'flex',
});

const columnStyle = computed(() => {
  if (props.width === 'flex') {
    return { flex: '1 1 0', width: 'auto', minWidth: 0 };
  }
  return { width: props.width, flex: '0 0 auto' };
});
</script>

<template>
  <div :style="columnStyle" class="kanban-column">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
/* 交叉轴高度交给 KanbanScreen 的 align（stretch / center），勿写死 height:100% */
.kanban-column {
  display: flex;
  flex-direction: column;
  min-height: 0;
}
</style>
