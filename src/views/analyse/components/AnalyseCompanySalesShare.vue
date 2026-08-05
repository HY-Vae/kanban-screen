<script lang="ts" setup>
import Progress1 from '@/components/Progress/Progress1.vue';
import AnalysePanelTitle from '@/views/analyse/components/AnalysePanelTitle.vue';
import { useAnalyseCompanySales } from '@/views/analyse/composables/useAnalyseCompanySales';

defineOptions({ name: 'AnalyseCompanySalesShare' });

const { companies } = useAnalyseCompanySales();
</script>

<template>
  <div class="analyse-company-sales-share">
    <AnalysePanelTitle title="销售公司销售设备数量占比" />

    <ul>
      <li v-for="(item, companyIndex) in companies" :key="`${item.name}-${companyIndex}`">
        <div class="analyse-company-sales-share__info">
          <span>{{ item.name }}</span>
          <div class="analyse-company-sales-share__meta">
            <span class="mr-[14px]">{{ item.amount }}台</span>
            <span class="mr-[9px] c-primary-secondary">环比 {{ item.percent }} %</span>
            <i class="i-mdi-trending-up" />
          </div>
        </div>
        <Progress1 :progress="item.percent" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.analyse-company-sales-share {
  width: 100%;
  margin: 47px 0 0;
  color: #fff;

  li {
    margin: 0 0 27px;

    &:nth-child(1) {
      margin: 35px 0 27px;
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;
  }

  &__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;

    i {
      color: var(--kanban-color-accent);
    }
  }
}
</style>
