<template>
  <div>
    <div class="shopcart">
      <div class="content2">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo highlight" @click="toggleShow">
              <i class="iconfont iconshoppingcart" :class="{highlight: totalNum}"></i>
            </div>
            <div v-if="totalNum" class="num">{{ totalNum }}</div>
          </div>
          <div class="price" :class="{highlight: totalNum}">￥{{ totalMoney }}</div>
          <div v-if="info" class="desc">另需配送费￥{{ info.deliveryPrice }}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="enough">
            {{ textContent }}
          </div>
        </div>
      </div>
      <!--      购物车列表的交互效果-->
      <transition name="cartList">
        <div class="shopcart-list" v-show="isShowMask">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="emptyCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li v-for="(food,index) in cartFoods" :key="index" class="food">
                <span class="name">{{ food.name }}</span>
                <div class="price"><span>￥{{ food.price }}</span></div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                  <!--            <div class="cartcontrol">
                                      <div class="iconfont icon-remove_circle_outline"></div>
                                      <div class="cart-count">1</div>
                                      <div class="iconfont icon-add_circle"></div>
                                    </div>-->
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <!--    这个是遮罩-->
    <div @click="isShowMask=false" class="list-mask" v-if="isShowMask"></div>
  </div>

</template>

<script>
import {mapGetters, mapState} from "vuex"
import CartControl from "@/components/CartControl/CartControl";
import {EMPTY_CART} from "@/vuex/mutation_type";
import {MessageBox} from "mint-ui"

export default {
  name: "ShopCart",
  components: {
    CartControl
  },
  data() {
    return {
      isShowMask: false

    }
  },
  computed: {
    ...mapGetters(['totalNum', 'totalMoney']),
    ...mapState({
          info: state => state.shop.shopData.info,
          cartFoods: state => state.shop.cartFoods
        }
    ),
    textContent() {
      if (!this.info) return;

      let content = "";
      //还差￥10元起送
      if (!this.totalMoney) {
        content = `${this.info.deliveryPrice}元起送`
      } else if (this.totalMoney < this.info.deliveryPrice) {
        content = `差${this.info.deliveryPrice - this.totalMoney}元配送`
      } else {
        content = "去结算"
      }
      return content;
    },
    enough() {
      if (!this.info) return;
      return this.totalMoney < this.info.deliveryPrice ? 'not-enough' : 'enough'
    }

  },
  methods: {
    toggleShow() {
      if (this.totalNum) {
        this.isShowMask = !this.isShowMask
      }
    },
    emptyCart() {
      MessageBox.confirm('确定清空吗?').then(
          () => {
            this.$store.commit(EMPTY_CART)
          },
          ()=>{console.log("取消清空");}

          )

    }
  },
  watch: {
    cartFoods(newValue) {
      if (newValue.length === 0) this.isShowMask = false

    }
  },
  mounted() {
    window.onbeforeunload = function(){
     console.log(111);
    };
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
.shopcart
  position: fixed
  left: 0
  bottom: 0
  z-index: 50
  width: 100%
  height: 48px

.content2
  display: flex
  background: #141d27
  font-size: 0
  color: rgba(255, 255, 255, 0.4)

  .content-left
    flex: 1

    .logo-wrapper
      display: inline-block
      vertical-align: top
      position: relative
      top: -10px
      margin: 0 12px
      padding: 6px
      width: 56px
      height: 56px
      box-sizing: border-box
      border-radius: 50%
      background: #141d27

      .logo
        width: 100%
        height: 100%
        border-radius: 50%
        text-align: center
        background: #2b343c

        &.highlight
          background: $green

        .iconshoppingcart
          line-height: 44px
          font-size: 24px
          color: #80858a

          &.highlight
            color: #fff

      .num
        position: absolute
        top: 0
        right: 0
        width: 24px
        height: 16px
        line-height: 16px
        text-align: center
        border-radius: 16px
        font-size: 9px
        font-weight: 700
        color: #ffffff
        background: rgb(240, 20, 20)
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)

    .price
      display: inline-block
      vertical-align: top
      margin-top: 12px
      line-height: 24px
      padding-right: 12px
      box-sizing: border-box
      border-right: 1px solid rgba(255, 255, 255, 0.1)
      font-size: 16px
      font-weight: 700

      &.highlight
        color: #fff

    .desc
      display: inline-block
      vertical-align: top
      margin: 12px 0 0 12px
      line-height: 24px
      font-size: 10px

  .content-right
    flex: 0 0 105px
    width: 105px

    .pay
      height: 48px
      line-height: 48px
      text-align: center
      font-size: 12px
      font-weight: 700

      &.not-enough
        background: #2b333b

      &.enough
        background: #00b43c
        color: #fff

.shopcart-list
  &.cartList-enter-active, &.cartList-leave-active
    transition: all .5s;

  &.cartList-enter, &.cartList-leave-to
    transform translateY(0)
  position: absolute
  left: 0
  top: 0
  z-index: -1
  width: 100%
  transform translateY(-100%)

  .list-header
    height: 40px
    line-height: 40px
    padding: 0 18px
    background: #f3f5f7
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)

    .title
      float: left
      font-size: 14px
      color: rgb(7, 17, 27)

    .empty
      float: right
      font-size: 12px
      color: rgb(0, 160, 220)

  .list-content
    padding: 0 18px
    max-height: 217px
    overflow: hidden
    background: #fff

    .food
      position: relative
      padding: 12px 0
      box-sizing: border-box
      bottom-border-1px(rgba(7, 17, 27, 0.1))

      .name
        line-height: 24px
        font-size: 14px
        color: rgb(7, 17, 27)

      .price
        position: absolute
        right: 90px
        bottom: 12px
        line-height: 24px
        font-size: 14px
        font-weight: 700
        color: rgb(240, 20, 20)

      .cartcontrol-wrapper
        position: absolute
        right: 0
        bottom: 6px

.list-mask
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 40
  backdrop-filter: blur(10px)
  opacity: 1
  background: rgba(7, 17, 27, 0.6)

  &.fade-enter-active, &.fade-leave-active
    transition: all 0.5s

  &.fade-enter, &.fade-leave-to
    opacity: 0
</style>
