<template>
<div class="m-center-layout">
  <div class="m-center-layout-body">
    <slot></slot>
  </div>
</div>
</template>
<script>
export default {
  name: 'MCenterLayout'
}
</script>
<style>
  .m-center-layout{
    display: table;
    height: 100%;
    width: 100%;
  }
  .m-center-layout-body{
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    line-height: 1;
  }
</style>
