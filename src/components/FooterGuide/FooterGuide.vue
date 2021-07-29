<template>
  <ul class="footerContainer">
    <li :class="{on:$route.path === '/msite'}" @click="changeFooter('/msite')">
      <i class="iconfont icon1"></i>
      <span>首页</span>
    </li>
    <li :class="{on:$route.path === '/search'}" @click="changeFooter('/search')">
      <i class="iconfont iconsousuo1"></i>
      <span>搜索</span>
    </li>
    <li :class="{on:$route.path === '/order'}" @click="changeFooter('/order')">
      <i class="iconfont iconorder"></i>
      <span>订单</span>
    </li>
    <li :class="{on:$route.path === '/profile'}" @click="changeFooter('/profile')">
    <i class="iconfont iconprofile"></i>
    <span>我的</span>
  </li>

  </ul>
</template>

<script>
export default {
  name: "FooterGuide",
  methods:{
    changeFooter(path){
      if (this.$route.path !== path){this.$router.replace(path)} //路径不同我们就跳转
      else {location.href = path} //路径相同我们就刷新处理
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"

.footerContainer
  top-border-1px(#ccc)
  width 100%
  position fixed
  left 0
  bottom  0
  z-index 5
  height 50px
  display flex
  align-items center
  background-color: #fff;
  li
    flex 1
    display flex
    flex-direction column
    align-items center
    &.on
      color $green
    i
      font-size 22px
      margin-bottom 2px
      font-weight 700



</style>