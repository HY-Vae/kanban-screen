<script lang="ts" setup>
import forbiddenImg from '@/assets/status/403.svg';
import ErrorPageActions from '@/views/error-page/components/ErrorPageActions.vue';

defineOptions({ name: 'ForbiddenPage' });
</script>

<template>
  <div class="error-page">
    <img :src="forbiddenImg" alt="403" class="error-page__illust" />
    <div class="error-page__body">
      <p class="error-page__code">403</p>
      <p class="error-page__message">抱歉，您没有权限访问该页面</p>
      <ErrorPageActions />
    </div>
  </div>
</template>

<style lang="scss" src="./styles/error-page.scss"></style>
