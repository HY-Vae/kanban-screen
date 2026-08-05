<script lang="ts" setup>
import KanbanScreen from '@/components/kanban/KanbanScreen';
import CommunityAlarmOverview from '@/views/community/components/CommunityAlarmOverview.vue';
import CommunityDeviceOverview from '@/views/community/components/CommunityDeviceOverview.vue';
import CommunityParkMetrics from '@/views/community/components/CommunityParkMetrics.vue';
import CommunityPopulationStage from '@/views/community/components/CommunityPopulationStage.vue';
import CommunityServiceProjects from '@/views/community/components/CommunityServiceProjects.vue';

defineOptions({ name: 'CommunityScreen' });
</script>

<template>
  <!-- 社区屏为满宽三栏，保持壳默认 justify=between -->
  <KanbanScreen center-width="926px" class="community" left-width="530px" right-width="530px">
    <template #left>
      <div class="community__aside">
        <CommunityDeviceOverview />
        <CommunityAlarmOverview />
      </div>
    </template>
    <template #center>
      <CommunityPopulationStage />
    </template>
    <template #right>
      <div class="community__aside">
        <CommunityParkMetrics />
        <CommunityServiceProjects />
      </div>
    </template>
  </KanbanScreen>
</template>

<style lang="scss">
/* 侧栏排列非 scoped，避免子面板宽度吃不到 */
.community {
  &__aside {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: space-between;
    width: 530px;
    height: 100%;
    color: #fff;
  }
}
</style>
