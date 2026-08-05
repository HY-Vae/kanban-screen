<script lang="ts" setup>
import KanbanScreen from '@/components/kanban/KanbanScreen';
import AnalyseBrandShare from '@/views/analyse/components/AnalyseBrandShare.vue';
import AnalyseBrandShowcase from '@/views/analyse/components/AnalyseBrandShowcase.vue';
import AnalyseCompanySalesShare from '@/views/analyse/components/AnalyseCompanySalesShare.vue';
import AnalyseDataShare from '@/views/analyse/components/AnalyseDataShare.vue';
import AnalyseDataStatistics from '@/views/analyse/components/AnalyseDataStatistics.vue';
import AnalyseDeviceSalesTotal from '@/views/analyse/components/AnalyseDeviceSalesTotal.vue';
import AnalyseJiangsuMap from '@/views/analyse/components/AnalyseJiangsuMap.vue';
import AnalyseRegionSales from '@/views/analyse/components/AnalyseRegionSales.vue';
import AnalyseShowcaseMetrics from '@/views/analyse/components/AnalyseShowcaseMetrics.vue';

defineOptions({ name: 'AnalyseScreen' });
</script>

<template>
  <!-- 分析屏接近满宽三栏，保持壳默认 justify=between -->
  <KanbanScreen
    background="/images/bg/bg05.png"
    center-width="803px"
    class="analyse"
    gap="35px"
    left-width="496px"
    padding-x="20px"
    padding-y="0"
    right-width="496px"
  >
    <template #left>
      <div class="analyse__aside">
        <AnalyseDeviceSalesTotal />
        <AnalyseCompanySalesShare />
        <AnalyseBrandShare />
      </div>
    </template>
    <template #center>
      <div class="analyse__stage">
        <AnalyseShowcaseMetrics />
        <AnalyseJiangsuMap />
        <AnalyseRegionSales />
      </div>
    </template>
    <template #right>
      <div class="analyse__aside">
        <AnalyseDataShare />
        <AnalyseBrandShowcase />
        <AnalyseDataStatistics />
      </div>
    </template>
  </KanbanScreen>
</template>

<style lang="scss">
/* 侧栏非 scoped，避免子面板宽度吃不到 */
.analyse {
  &__aside {
    display: flex;
    flex-direction: column;
    width: 496px;
    height: 970px;
    color: #fff;
  }

  &__stage {
    width: 100%;
    height: 970px;
  }
}
</style>
