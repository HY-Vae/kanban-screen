<script lang="ts" setup>
import CommunityPanel from '@/views/community/components/CommunityPanel.vue';
import CommunityServiceRatioBar from '@/views/community/components/CommunityServiceRatioBar.vue';
import { useCommunityServiceProjects } from '@/views/community/composables/useCommunityServiceProjects';

defineOptions({ name: 'CommunityServiceProjects' });

const { projects } = useCommunityServiceProjects();
</script>

<template>
  <div class="community-service-projects">
    <CommunityPanel title="服务项目">
      <div class="community-service-projects__list">
        <CommunityServiceRatioBar
          v-for="item in projects"
          :key="item.id"
          :completed="item.completed"
          :remaining="item.remaining"
          :title="item.name"
        />
      </div>
    </CommunityPanel>
  </div>
</template>

<style lang="scss" scoped>
.community-service-projects {
  width: 100%;
  padding: 9px 15px;
  background: rgb(14 95 255 / 20%);

  &__list {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: hidden auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
