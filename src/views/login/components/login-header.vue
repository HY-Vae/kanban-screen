<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';

defineOptions({ name: 'LoginHeader' });

const router = useRouter();
const route = useRoute();
</script>

<template>
  <header>
    <div class="header-title">
      <h1>{{ route.meta.title }}</h1>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header-title {
  width: 100%;
  height: 108px;
  background: url('@/layout/layout-header/images/layout-header-1.png') no-repeat center;
  background-size: cover;

  h1 {
    font-size: 42px;
    line-height: 100px;
    color: #fff;
    text-align: center;
  }
}
</style>
