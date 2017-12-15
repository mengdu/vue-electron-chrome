<template>
<webview :src="src" class="webview"></webview>
</template>
<script>
export default {
  data () {
    return {
      // src: 'http://localhost'
      // src: 'http://vadmin.lanyueos.com'
      src: ''
    }
  },
  created () {
    this.src = process.env.APP_URL || ''
  }
}
</script>
<style type="text/css">
  .webview{
    display: flex;
    height: 100%;
    width: 100%;
  }
</style>
