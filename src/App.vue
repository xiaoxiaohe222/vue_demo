<template>
  <div>
    <router-view></router-view>

    <FooterGuide v-if="$route.meta.isShowFooter"/>

  </div>
</template>

<script>
import FooterGuide from "@/components/FooterGuide/FooterGuide";
import {reqAutoLogin} from "@/api";
import {SAVE_USER} from "@/vuex/mutation_type";

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

   const result = await reqAutoLogin()
   if (result.code === 0){
     this.$store.commit(SAVE_USER,result.data)
   }

  }


}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "common/stylus/mixins.styl"




</style>
