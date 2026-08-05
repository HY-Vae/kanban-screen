<script lang="ts" setup>
import serverErrorImg from '@/assets/status/500.svg';
import ErrorPageActions from '@/views/error-page/components/ErrorPageActions.vue';

defineOptions({ name: 'ServerErrorPage' });
</script>

<template>
  <div class="error-page">
    <img :src="serverErrorImg" alt="500" class="error-page__illust" />
    <div class="error-page__body">
      <p class="error-page__code">500</p>
      <p class="error-page__message">抱歉，服务器出了一点问题</p>
      <ErrorPageActions />
    </div>
  </div>
</template>

<style lang="scss" src="./styles/error-page.scss"></style>
