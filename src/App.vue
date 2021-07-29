<template>
  <div>
    <router-view></router-view>

    <FooterGuide v-if="$route.meta.isShowFooter"/>

  </div>
</template>

<script>
import FooterGuide from "@/components/FooterGuide/FooterGuide";
import {SAVE_ADDRESS} from "@/vuex/mutation_type";

export default {
  name: 'App',
  components:{
    FooterGuide
  },
  data() {
    return {

    }
  },
 async mounted() {
    this.$store.dispatch(SAVE_ADDRESS)
  }


}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "common/stylus/mixins.styl"




</style>
