<script lang="ts" setup>
import KanbanScreen from '@/components/kanban/KanbanScreen';
import BusinessAnnualTax from '@/views/business/components/BusinessAnnualTax.vue';
import BusinessCategoryExports from '@/views/business/components/BusinessCategoryExports.vue';
import BusinessDailyTradeCards from '@/views/business/components/BusinessDailyTradeCards.vue';
import BusinessEnterpriseOverview from '@/views/business/components/BusinessEnterpriseOverview.vue';
import BusinessForeignTrade from '@/views/business/components/BusinessForeignTrade.vue';
import BusinessGeoPlanning from '@/views/business/components/BusinessGeoPlanning.vue';
import BusinessImportExportVolume from '@/views/business/components/BusinessImportExportVolume.vue';
import BusinessParkAssets from '@/views/business/components/BusinessParkAssets.vue';
import BusinessRepairExport from '@/views/business/components/BusinessRepairExport.vue';

defineOptions({ name: 'BusinessScreen' });
</script>

<template>
  <!-- 经营监管接近满宽三栏，保持壳默认 justify=between -->
  <KanbanScreen
    background="/images/bg/bg02.png"
    center-width="770px"
    class="business"
    left-width="530px"
    padding-x="25px"
    padding-y="19px"
    right-width="530px"
  >
    <template #left>
      <div class="business__aside">
        <BusinessImportExportVolume />
        <BusinessEnterpriseOverview />
        <BusinessGeoPlanning />
      </div>
    </template>
    <template #center>
      <div class="business__stage">
        <BusinessDailyTradeCards />
        <BusinessParkAssets />
        <BusinessAnnualTax />
      </div>
    </template>
    <template #right>
      <div class="business__aside">
        <BusinessRepairExport />
        <BusinessCategoryExports />
        <BusinessForeignTrade />
      </div>
    </template>
  </KanbanScreen>
</template>

<style lang="scss">
/* 侧栏非 scoped，避免子面板宽度吃不到 */
.business {
  &__aside {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 540px;
    height: 100%;
    color: #fff;
  }

  &__stage {
    width: 100%;
    height: 100%;
  }
}
</style>
