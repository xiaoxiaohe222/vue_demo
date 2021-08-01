<template>
  <div id="shopContainer">
    <ShopHeader />
<!--    tab栏部分-->
    <div class="tab-list">
      <span @click="$router.replace('/shop/food');currentIndex = 0" class="tab-item" :class="{on: currentIndex === 0}">点餐</span>
      <span @click="$router.replace('/shop/rating');currentIndex = 1" class="tab-item" :class="{on: currentIndex === 1}">评价</span>
      <span @click="$router.replace('/shop/info');currentIndex = 2" class="tab-item" :class="{on: currentIndex === 2}">商家</span>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import ShopHeader from "@/components/ShopHeader/ShopHeader";

import {mapState} from "vuex"


export default {
  name: "Shop",
  data(){
    return {
      currentIndex : 0

    }
  },
  computed:{
    ...mapState({
     name : state => state.shop.name
    })
  },
  components:{
    ShopHeader
  },
  mounted() {
    this.$store.dispatch("getShopData")  //将mock的数据捞到vuex中
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
#shopContainer
  .tab-list
    display flex
    border-bottom 1px solid #eee
    .tab-item
      position relative
      flex 1
      height 40px
      line-height 40px
      text-align center
      font-size 16px
      &.on:after
        content ""
        width 33%
        height 2px
        background-color: $green;
        position absolute
        left 50%
        bottom 0
        transform translateX(-50%)





</style>