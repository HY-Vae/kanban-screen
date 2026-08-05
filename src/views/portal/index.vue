<script lang="ts" setup>
import PortalContent from '@/views/portal/components/PortalContent.vue';
import PortalFooter from '@/views/portal/components/PortalFooter.vue';

defineOptions({ name: 'PortalScreen' });
</script>

<template>
  <div class="portal">
    <PortalContent />
    <PortalFooter />
  </div>
</template>

<style lang="scss">
.portal {
  width: 100%;
  height: 100%;
  animation: bounceInUp 1s;
}
</style>
