<template>
  <div id="foodContainer">
    <div class="food-l">
      <ul class="navList">
        <li>精选套餐</li>
        <li>精选套餐</li>
        <li>精选套餐</li>
        <li>精选套餐</li>
        <li>精选套餐</li>
        <li>精选套餐</li>
        <li>精选套餐</li>
        <li>精选套餐</li>
        <li>精选套餐</li>
        <li>精选套餐</li>
        <li>精选套餐</li>
        <li>精选套餐</li>
        <li>精选套餐</li>
        <li>精选套餐</li>
        <li>精选套餐</li>
        <li>精选套餐</li>
        <li>精选套餐</li>
        <li>精选套餐</li>
      </ul>
    </div>
    <div class="food-r"></div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'


export default {
  name: "Food",
  mounted() {
    new BScroll(".food-l",{
      scrollY:true
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

#foodContainer
  display flex
  overflow hidden
  .food-l
    width 80px
    background-color: pink;
    height calc(100vh - 224px)
    .navList
      li
        width 100%
        height 50px
        line-height 50px
        text-align center
        position relative
        &::after
          content ""
          width 80%
          height 1px
          background-color: #eee;
          position absolute
          left 50%
          bottom 0
          transform translateX(-50%)

  .food-r
    width calc(100vw - 80px)
    background-color: darkorange;


</style>