<template>
  <div id="shopContainer">
    <ShopHeader/>
    <!--    tab栏部分-->
    <div class="tab-list">
      <span @click="$router.replace('/shop/food');currentIndex = 0" class="tab-item" :class="{on: currentIndex === 0}">点餐</span>
      <span @click="$router.replace('/shop/rating');currentIndex = 1" class="tab-item"
            :class="{on: currentIndex === 1}">评价</span>
      <span @click="$router.replace('/shop/info');currentIndex = 2" class="tab-item" :class="{on: currentIndex === 2}">商家</span>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import ShopHeader from "@/components/ShopHeader/ShopHeader";
import {SAVE_SHOPDATA,SAVE_CARTFOODS} from "@/vuex/mutation_type";
import {mapState} from "vuex"


export default {
  name: "Shop",
  data() {
    return {
      currentIndex: 0

    }
  },
  computed: {
    ...mapState({
      shopData: state => state.shop.shopData
    })
  },
  components: {
    ShopHeader
  },
  mounted() {
    //一上来肯定是从session读取没有才去vuex中读取
    let result = sessionStorage.getItem("cart_key")

      if (result) {
        let parseResult = JSON.parse(result)
        this.$store.commit(SAVE_SHOPDATA, parseResult)
        //通过parseResult计算出对应的购物车数据
      let cartArr =   parseResult.goods.reduce((pre,item)=>{
          pre.push(...item.foods.filter(food=>food.num>0))
          return pre
        },[])
        this.$store.commit(SAVE_CARTFOODS,cartArr)


      } else {
        this.$store.dispatch("getShopData")  //将mock的数据捞到vuex中
      }



    window.onbeforeunload = () => {
      //页面刷新之前将数据存入sessionStorage中
      sessionStorage.setItem("cart_key", JSON.stringify(this.shopData))
    }


  },
  beforeDestroy() {
    sessionStorage.setItem("cart_key", JSON.stringify(this.shopData))
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