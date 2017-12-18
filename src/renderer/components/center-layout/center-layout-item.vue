<template>
<div class="m-center-layout-item">
  <slot class="test"></slot>
</div>
</template>
<script>
export default {
  name: 'MCenterLayoutItem'
}
</script>
<style>
  .m-center-layout-item{
    display: inline-block;
    text-align: left;
  }
</style>
