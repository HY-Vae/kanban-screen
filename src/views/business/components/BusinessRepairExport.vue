<script lang="ts" setup>
import { computed } from 'vue';

import TimeSelect from '@/components/TimeSelect/index.vue';
import BusinessAsidePanel from '@/views/business/components/BusinessAsidePanel.vue';
import { useBusinessRepairExport } from '@/views/business/composables/useBusinessRepairExport';

defineOptions({ name: 'BusinessRepairExport' });

const { data } = useBusinessRepairExport();

const timeList = computed(() => data.value.periods);
</script>

<template>
  <div class="business-repair">
    <BusinessAsidePanel tag="总数据" title="园区进出口额">
      <template #actions>
        <TimeSelect :time-list="timeList" />
      </template>

      <div class="business-repair__body">
        <div class="business-repair__spin">
          <div class="business-repair__describe">
            <strong>{{ data.total }}</strong>
            <span>{{ data.label }}</span>
          </div>
        </div>

        <ul class="business-repair__metrics">
          <li v-for="item in data.metrics" :key="item.key">
            <h2>{{ item.unit }} {{ item.value }}</h2>
            <img alt="" src="@/views/business/images/sidebar/bg-middle-coordinate.png" />
            <p>{{ item.label }}</p>
          </li>
        </ul>
      </div>
    </BusinessAsidePanel>
  </div>
</template>

<style lang="scss" scoped>
.business-repair {
  width: 100%;
  height: 246px;

  &__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 14px 0 0;
  }

  &__spin {
    width: 167px;
    height: 167px;
    background: url('@/views/business/images/sidebar/bg-middle-spin.png') no-repeat center;
    background-size: cover;
    animation: rotate 2s linear infinite;
  }

  &__describe {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: var(--kanban-color-accent);
    text-align: center;
    animation: rotate-reverse 2s linear infinite;

    strong {
      font-size: 44px;
      color: var(--kanban-color-accent-muted);
    }
  }

  &__metrics {
    display: flex;
    flex: 1;
    justify-content: space-around;
    font-size: 13px;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;

      h2 {
        font-size: 31px;
        color: var(--kanban-color-accent);
      }

      img {
        width: 44px;
        height: 50px;
        margin: 9px 0 0;
        animation: business-bounce 1s ease-in-out infinite;
      }

      p {
        width: 72px;
        margin: 9px 0 0;
        text-align: center;
      }
    }
  }
}

@keyframes business-bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}
</style>
