<template>
  <div>
    <h2>我是Home组件里面的h2标签</h2>
    <slot name="default" :linkUrl="linkUrl"></slot>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      linkUrl: 'https://www.baidu.com'
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>