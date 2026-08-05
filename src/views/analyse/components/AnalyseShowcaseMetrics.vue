<script lang="ts" setup>
import { useAnalyseShowcaseMetrics } from '@/views/analyse/composables/useAnalyseShowcaseMetrics';

defineOptions({ name: 'AnalyseShowcaseMetrics' });

const { metrics } = useAnalyseShowcaseMetrics();
</script>

<template>
  <ul class="analyse-showcase-metrics">
    <li v-for="(item, metricIndex) in metrics" :key="`${item.name}-${metricIndex}`">
      <h3>{{ item.name }}</h3>
      <strong>{{ item.value }}</strong>
      <span>台</span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.analyse-showcase-metrics {
  display: flex;
  justify-content: space-between;
  margin: 15px 0 0;

  h3 {
    font-size: 18px;
    color: #94ddff;
  }

  strong {
    font-size: 36px;
    color: #fff;
  }

  span {
    margin: 0 0 0 8px;
    font-size: 16px;
    color: #fff;
  }
}
</style>
