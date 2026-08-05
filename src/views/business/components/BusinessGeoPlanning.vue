<script lang="ts" setup>
import { computed } from 'vue';

import BusinessAsidePanel from '@/views/business/components/BusinessAsidePanel.vue';
import { useBusinessGeoPlanning } from '@/views/business/composables/useBusinessGeoPlanning';

defineOptions({ name: 'BusinessGeoPlanning' });

const { data } = useBusinessGeoPlanning();

const describe = computed(() => (data.value.asOf ? `截止时间至${data.value.asOf}` : ''));
</script>

<template>
  <div class="business-geo">
    <BusinessAsidePanel :describe="describe" title="地理规划">
      <ul
        v-for="(row, rowIndex) in data.rows"
        :key="`geo-row-${rowIndex}`"
        class="business-geo__row flex-x-around mt-[12px]"
      >
        <li v-for="item in row" :key="item.id">
          <div class="business-geo__metric">
            <h2 :style="{ color: item.color }">{{ item.value }}</h2>
            <p>{{ item.label }}</p>
            <div class="business-geo__icon">
              <i :style="{ color: item.color }" class="i-mdi:electricity" />
            </div>
          </div>
        </li>
      </ul>
    </BusinessAsidePanel>
  </div>
</template>

<style lang="scss" scoped>
.business-geo {
  width: 100%;
  height: 294px;

  &__metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 120px;

    h2 {
      font-size: 24px;
      text-align: center;
    }

    p {
      margin: 0 0 2px;
      font-size: 14px;
      text-align: center;
    }
  }

  &__icon {
    display: flex;
    justify-content: center;
    width: 74px;
    height: 46px;
    background: url('@/views/business/images/sidebar/device-carriage.png') no-repeat center;
    background-size: cover;

    i {
      font-size: 26px;
    }
  }
}
</style>
