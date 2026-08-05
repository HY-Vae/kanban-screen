<script lang="ts" setup>
import notFoundImg from '@/assets/status/404.svg';
import ErrorPageActions from '@/views/error-page/components/ErrorPageActions.vue';

defineOptions({ name: 'NotFoundPage' });
</script>

<template>
  <div class="error-page">
    <img :src="notFoundImg" alt="404" class="error-page__illust" />
    <div class="error-page__body">
      <p class="error-page__code">404</p>
      <p class="error-page__message">抱歉，您访问的页面不存在</p>
      <ErrorPageActions />
    </div>
  </div>
</template>

<style lang="scss" src="./styles/error-page.scss"></style>
