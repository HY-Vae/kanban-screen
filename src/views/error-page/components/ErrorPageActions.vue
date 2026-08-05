<script lang="ts" setup>
import { useRouter } from 'vue-router';

defineOptions({ name: 'ErrorPageActions' });

const router = useRouter();

function goBack() {
  if (window.history.length > 1) {
    router.back();
    return;
  }
  void router.replace({ name: 'Welcome' });
}

function goHome() {
  void router.replace({ name: 'Welcome' });
}
</script>

<template>
  <div class="error-page-actions">
    <button class="error-page-actions__btn error-page-actions__btn--primary" type="button" @click="goBack">
      返回上一页
    </button>
    <button class="error-page-actions__btn" type="button" @click="goHome">回到首页</button>
  </div>
</template>

<style lang="scss" scoped>
.error-page-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }

  &__btn {
    min-width: 110px;
    height: 36px;
    padding: 0 16px;
    font-size: 14px;
    color: var(--kanban-text-primary);
    cursor: pointer;
    background: transparent;
    border: 1px solid var(--kanban-border);
    border-radius: 4px;
    transition: background-color var(--kanban-duration-fast) ease;

    &:hover {
      background: var(--kanban-bg-panel-hover);
    }

    &--primary {
      background: var(--kanban-color-brand);
      border-color: var(--kanban-color-brand);

      &:hover {
        background: var(--kanban-color-brand-hover);
      }
    }
  }
}
</style>
