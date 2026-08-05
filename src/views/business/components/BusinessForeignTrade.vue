<script lang="ts" setup>
import { computed } from 'vue';

import BusinessAsidePanel from '@/views/business/components/BusinessAsidePanel.vue';
import BusinessTrendBar from '@/views/business/components/BusinessTrendBar.vue';
import { useBusinessForeignTrade } from '@/views/business/composables/useBusinessForeignTrade';

defineOptions({ name: 'BusinessForeignTrade' });

const { cards } = useBusinessForeignTrade();

const describe = computed(() => '截止时间至2021.12.30');

function formatTrend(trend: number) {
  return `${trend > 0 ? '+' : ''}${trend}%`;
}
</script>

<template>
  <div class="business-foreign">
    <BusinessAsidePanel :describe="describe" title="地理规划">
      <ul class="business-foreign__list">
        <li v-for="card in cards" :key="card.id">
          <div class="business-foreign__change">
            <p>环比变化</p>
            <span>{{ formatTrend(card.trend) }}</span>
          </div>
          <h2>
            {{ card.value }}
            <em>{{ card.unit }}</em>
          </h2>
          <h3>{{ card.title }}</h3>
          <div class="business-foreign__chart">
            <BusinessTrendBar :chart-value="card.chartValue" />
          </div>
        </li>
      </ul>
    </BusinessAsidePanel>
  </div>
</template>

<style lang="scss" scoped>
.business-foreign {
  width: 100%;
  height: 294px;

  &__list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 167px;
    margin: 33px 4px 0;

    li {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 240px;
      height: 167px;
      background: url('@/views/business/images/sidebar/bg-sidebar-bottom-panel.png') no-repeat center;
      background-size: cover;

      h2 {
        margin: 0 0 24px;
        font-size: 32px;
        color: var(--kanban-color-accent);

        em {
          font-size: 20px;
          font-style: normal;
        }
      }

      h3 {
        position: absolute;
        bottom: 14px;
        font-size: 19px;
      }
    }
  }

  &__change {
    display: flex;

    p {
      font-size: 13px;
    }

    span {
      display: inline-block;
      margin: 0 0 0 9px;
      font-size: 13px;
      color: var(--kanban-color-warning-soft);
    }
  }

  &__chart {
    position: absolute;
    top: 34px;
    right: 9px;
    width: 29px;
    height: 63px;
  }
}
</style>
