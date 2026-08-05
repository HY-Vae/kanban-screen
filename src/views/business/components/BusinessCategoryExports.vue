<script lang="ts" setup>
import { computed } from 'vue';

import BusinessAsidePanel from '@/views/business/components/BusinessAsidePanel.vue';
import { useBusinessCategoryExports } from '@/views/business/composables/useBusinessCategoryExports';

defineOptions({ name: 'BusinessCategoryExports' });

const { list } = useBusinessCategoryExports();

const describe = computed(() => {
  const asOf = list.value[0]?.asOf;
  return asOf ? `截止时间至${asOf}` : '';
});
</script>
<template>
  <div class="business-category">
    <BusinessAsidePanel :describe="describe" title="企业信息">
      <ul class="business-category__list">
        <li v-for="item in list" :key="item.id">
          <h2>{{ item.title }}</h2>
          <strong>¥{{ item.value }}</strong>
          <span>{{ item.unit }}</span>
          <div class="business-category__trend">
            <div>{{ item.trend }}%</div>
            <div>环比</div>
          </div>
        </li>
      </ul>
    </BusinessAsidePanel>
  </div>
</template>

<style lang="scss" scoped>
.business-category {
  width: 100%;
  height: 354px;

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: calc(100% - 60px);

    li {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 243px;
      height: 124px;
      padding: 0 0 0 14px;
      margin: 14px 0 0;
      background: url('@/views/business/images/sidebar/bg-sidebar-panel.png') no-repeat center;
      background-size: cover;

      h2 {
        font-size: 17px;
        color: #fff;
      }

      strong {
        font-size: 27px;
        color: var(--kanban-color-accent);
      }

      span {
        position: absolute;
        right: 56px;
        bottom: 42px;
        font-size: 15px;
        color: var(--kanban-color-accent);
      }
    }
  }

  &__trend {
    position: absolute;
    top: -14px;
    right: -9px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    font-size: 9px;
    color: var(--kanban-color-info);
    background: url('@/assets/images/common/bg/bg-main-2.png') no-repeat center;
    background-size: cover;
  }
}
</style>
