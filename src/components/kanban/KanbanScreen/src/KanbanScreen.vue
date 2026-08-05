<script lang="ts" setup>
import { computed, useSlots, watch } from 'vue';

import KanbanColumn from '@/components/kanban/KanbanColumn';
import { useAppStore } from '@/store/app';

import type { KanbanScreenProps } from './types';

defineOptions({ name: 'KanbanScreen' });

const props = withDefaults(defineProps<KanbanScreenProps>(), {
  background: '',
  leftWidth: '530px',
  centerWidth: 'flex',
  rightWidth: '',
  paddingX: 'var(--kanban-screen-padding-x)',
  paddingY: 'var(--kanban-screen-padding-y)',
  gap: 'var(--kanban-column-gap)',
  justify: 'between',
  align: 'stretch',
});

const slots = useSlots();
const appStore = useAppStore();

const resolvedRightWidth = computed(() => props.rightWidth || props.leftWidth);

const screenStyle = computed(() => ({
  padding: `${props.paddingY} ${props.paddingX}`,
}));

const columnsStyle = computed(() => {
  const justifyContent =
    props.justify === 'center' ? 'center' : props.justify === 'start' ? 'flex-start' : 'space-between';
  const alignItems = props.align === 'center' ? 'center' : props.align === 'start' ? 'flex-start' : 'stretch';

  return {
    gap: props.gap,
    justifyContent,
    alignItems,
  };
});

watch(
  () => props.background,
  (background) => {
    if (background) {
      appStore.setBackground(background);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div :style="screenStyle" class="kanban-screen">
    <div :style="columnsStyle" class="kanban-screen__columns">
      <KanbanColumn v-if="slots.left" :width="leftWidth">
        <slot name="left" />
      </KanbanColumn>

      <KanbanColumn v-if="slots.center" :width="centerWidth">
        <slot name="center" />
      </KanbanColumn>

      <KanbanColumn v-if="slots.right" :width="resolvedRightWidth">
        <slot name="right" />
      </KanbanColumn>
    </div>

    <footer v-if="slots.footer" class="kanban-screen__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.kanban-screen {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;

  &__columns {
    display: flex;
    flex: 1 1 auto;
    width: 100%;
    min-height: 0;
  }

  &__footer {
    flex: 0 0 auto;
    width: 100%;
  }
}
</style>
