<template>
  <div>
    <h1>我是app组件里面的h1</h1>
    <br>
    <br>
    <br>
    <hr>
    <Home>
      <!--      <h3 slot="default">我是app组建传递给home组件的内容</h3>-->
      <template v-slot:default="slotProps">
        <a :href="slotProps.linkUrl">我是app组件里面的a标签</a>
      </template>
    </Home>
  </div>
</template>

<script>
import mixin from "./mixins/index"
import Home from "@/components/Home";

export default {
  name: 'App',
  components: {
    Home
  },
  data() {
    return {
      msg:19
    }
  },
  mixins:[mixin], //使用混合
  mounted() {
    this.show();
    console.log(this.msg);
  }


}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">


</style>
