<template>
  <div id="cartContainer">
   <transition name="move">
     <div v-if="food.num>0"  class="cart-dec" @click="updateNum(false)">
       <i class="iconfont icon70BasicIcons-all-58"></i>
     </div>
   </transition>

    <div  v-if="food.num>0"  class="cart-num">{{food.num}}</div>
    <div class="cart-add" @click="updateNum(true)">
      <i class="iconfont icon70BasicIcons-all-59"></i>
    </div>
  </div>
</template>

<script>

export default {
  name: "CartControl",
  props:{
    food:{
      type:Object,
      required:true
    }
  },
  data(){
    return {

    }
  },
  methods:{
    updateNum(isAdd){
      this.$store.dispatch('changeNum',{isAdd,food:this.food})
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"

#cartContainer
  display flex
  .move-enter-active, .move-leave-active {
    transition: all .5s;
  }
  .move-enter, .move-leave-to{
    opacity: 0;
    transform translateX(20px) rotate(180deg)
  }
  .cart-num
    padding 0 5px

  i
    color $green

</style>