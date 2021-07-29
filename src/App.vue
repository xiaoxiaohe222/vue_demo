<template>
  <div>
    <router-view></router-view>

    <FooterGuide/>

  </div>
</template>

<script>
import FooterGuide from "@/components/FooterGuide/FooterGuide";

export default {
  name: 'App',
  components:{
    FooterGuide
  },
  data() {
    return {

    }
  }


}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "common/stylus/mixins.styl"




</style>
