<template>
  <div id="foodContainer">
    <div class="food-l">
      <ul class="navList" ref="leftNav">
        <li @click="changeLeft(index)" :class="{on: index === currentIndex}" v-for="(good,index) in goods"
            :key="index">{{ good.name }}
        </li>
      </ul>
    </div>
    <div class="food-r">
      <div class="foods-wrapper">
        <ul>
          <li v-for="(good,index) in goods" :key="index" class="food-list-hook">
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li v-for="(food,index) in good.foods" :key="index" class="food-item bottom-border-1px">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.image">
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span></div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import {mapState} from "vuex"
import CartControl from "@/components/CartControl/CartControl";

export default {
  name: "Food",
  components:{
    CartControl
  },
  data() {
    return {
      currentPositionY: 0,//初始滑动的距离顶部的距离
      liHeights: []
    }
  },
  mounted() {
    if (this.goods) {
      this._initScroll();
      this._initLiHeights()
      this._scrollEvent()
    }
  },
  computed: {
    ...mapState({
      goods: state => state.shop.shopData.goods
    }),
    currentIndex: {
      get() {
        return this.liHeights.indexOf(this.currentPositionY)
      },
      set(index) {
        this.currentPositionY = this.liHeights[index]

      }
    }
  },
  methods: {
    _initScroll() {
      this.bs1 = new BScroll(".food-l", {
        scrollY: true
      });
      this.bs2 = new BScroll(".food-r", {
        scrollY: true
      });
    },
    _initLiHeights() {
      let arr = []
      let offsetHeightArr = [0]
      let lis = document.querySelectorAll(".foods-wrapper>ul>li");
      [].slice.call(lis).forEach((li) => {
        arr.push(li.clientHeight)
      })
      arr.reduce((pre, current) => {
        offsetHeightArr.push(pre + current);
        return (pre + current);
      }, 0)
      //console.log(offsetHeightArr);//[0,748, 1058, 1526, 1647, 1862, 2096, 2406, 2904, 3597]
      this.liHeights = offsetHeightArr;
    },
    _scrollEvent() {
      const {liHeights} = this;
      this.bs2.on('scrollEnd', (position) => {
        let y = Math.abs(position.y)
        // console.log("取绝对值之后的y", y);
        if (position.y >= 0) {
          y = 0
        } else if (y >= liHeights[liHeights.length - 1]) {
          y = liHeights[liHeights.length - 1]
        } else {
          for (let i = 0; i < liHeights.length - 2; i++) {
            if (y >= liHeights[i] && y <= liHeights[i + 1]) {
              y = liHeights[i]
            }
          }
        }
        //console.log(y);
        this.currentPositionY = y;

        //然后让左边的ul移动距离
        // document.querySelector(".navList").style.transform = 'translateY(-'+this.currentIndex*50+'px)'
        //this.bs1.scrollToElement(this.$refs.leftNav.children[this.currentIndex],1000)

      })
    },
    changeLeft(index) {
      this.currentIndex = index;
//然后让右侧的滑块滑动到最顶端的位置
      //document.querySelector(".foods-wrapper").style.transform=`translateY(-${this.liHeights[index]}px)`
      this.bs2.scrollTo(0,-this.liHeights[index],1000)
    }
  },
  watch: {
    goods() {
      this.$nextTick(() => {
        console.log(this.goods);
        this._initScroll()
        this._initLiHeights()
        this._scrollEvent()

      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
#foodContainer
  display flex
  overflow hidden

  .food-l
    width 80px
    background-color: #f3f5f7
    height calc(100vh - 224px)

    .navList
      li
        width 100%
        height 50px
        line-height 50px
        text-align center
        position relative

        &.on
          color $green
          background-color: #fff;

        &::after
          content ""
          width 80%
          height 1px
          background-color: #DDB;
          position absolute
          left 50%
          bottom 0
          transform translateX(-50%)

  .food-r
    width calc(100vw - 80px)
    height calc(100vh - 224px)

    .foods-wrapper
      flex: 1

      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7

      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))

        &:last-child
          border-none()
          margin-bottom: 0

        .icon
          flex: 0 0 57px
          margin-right: 10px

        .content
          flex: 1

          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)

          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)

          .desc
            line-height: 12px
            margin-bottom: 8px

          .extra
            .count
              margin-right: 12px

          .price
            font-weight: 700
            line-height: 24px

            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)

            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)

          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px

</style>