<script lang="ts" setup>
defineOptions({ name: 'LayoutHeaderNav' });
</script>

<template>
  <div class="bar-op">
    <ul>
      <li><img alt="icon-1" src="../../images/icon/icon-1.png" /></li>
      <li><img alt="icon-2" src="../../images/icon/icon-2.png" /></li>
      <li><img alt="icon-3" src="../../images/icon/icon-3.png" /></li>
    </ul>
    <span class="hover">小兔子🐇</span>
  </div>
</template>

<style lang="scss" scoped>
.bar-op {
  position: absolute;
  top: 4px;
  right: 20px;
  display: flex;
  align-items: center;
  height: 36px;

  ul {
    float: left;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 148px;

    img {
      width: 36px;
    }
  }

  span {
    float: left;
    font-size: 12px;
    color: var(--kanban-color-info);
    cursor: pointer;
  }
}
</style>
