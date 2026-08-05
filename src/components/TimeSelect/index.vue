<script lang="ts" setup>
import { TimeSelectType } from '@/components/TimeSelect/type';

defineOptions({ name: 'TimeSelect' });

defineProps({
  timeList: Array<TimeSelectType>,
  modelValue: String,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handleChange = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value;
  emit('update:modelValue', value); // 触发 v-model 更新
};
</script>

<template>
  <select :value="modelValue" class="time-select" @change="handleChange">
    <option v-for="(item, index) in timeList" :key="index" :value="item.value">
      {{ item.label }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
.time-select {
  float: left;
  width: 100px;
  height: 26px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  background: rgb(24 69 135 / 55%);
  transition: all 0.3s;

  &:hover {
    background-color: rgb(14 95 255 / 38%);
  }
}
</style>
