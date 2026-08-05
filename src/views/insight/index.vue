<script lang="ts" setup>
import KanbanScreen from '@/components/kanban/KanbanScreen';
import InsightEnterpriseInfo from '@/views/insight/components/InsightEnterpriseInfo.vue';
import InsightNavCards from '@/views/insight/components/InsightNavCards.vue';
import InsightParkAreas from '@/views/insight/components/InsightParkAreas.vue';
import InsightParkPlanTrend from '@/views/insight/components/InsightParkPlanTrend.vue';
import InsightParkTrade from '@/views/insight/components/InsightParkTrade.vue';
import InsightRevenueOverview from '@/views/insight/components/InsightRevenueOverview.vue';
import InsightScaleBenefit from '@/views/insight/components/InsightScaleBenefit.vue';
import InsightYearIncome from '@/views/insight/components/InsightYearIncome.vue';

defineOptions({ name: 'InsightScreen' });
</script>

<template>
  <!-- 大数据洞察接近满宽三栏，保持壳默认 justify=between -->
  <KanbanScreen
    background="/images/bg/bg03.png"
    center-width="800px"
    class="insight"
    left-width="530px"
    padding-x="14px"
    padding-y="0"
    right-width="530px"
  >
    <template #left>
      <div class="insight__aside">
        <InsightScaleBenefit />
        <InsightYearIncome />
        <InsightParkPlanTrend />
      </div>
    </template>
    <template #center>
      <div class="insight__stage">
        <InsightNavCards />
        <InsightRevenueOverview />
      </div>
    </template>
    <template #right>
      <div class="insight__aside">
        <InsightParkTrade />
        <InsightEnterpriseInfo />
        <InsightParkAreas />
      </div>
    </template>
  </KanbanScreen>
</template>

<style lang="scss">
/* 侧栏非 scoped，避免子面板宽度吃不到 */
.insight {
  &__aside {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 530px;
    height: 100%;
    color: #fff;
  }

  &__stage {
    width: 100%;
    height: 100%;
  }
}
</style>
