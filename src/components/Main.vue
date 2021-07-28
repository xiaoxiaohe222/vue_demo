<template>
 <div>
   <p v-if="firstView">请输入搜索数据</p>
   <p v-else-if="isLoading">isLoading...</p>
   <p v-else-if="errMsg">{{errMsg}}</p>
   <div v-else class="row">
     <div v-for="(user) in users" :key="user.id" class="card">
       <a :href="user.url" target="_blank">
         <img :src="user.html_url" style='width: 100px'/>
       </a>
       <p class="card-text">reactjs</p>
     </div>
   </div>
 </div>
</template>

<script>
import  {mapState} from "vuex"
export default {
  name: "Main",
  computed:{
    ...mapState(['users','firstView','isLoading','errMsg'])
  }
}
</script>

<style lang="less" scoped>
.card {
  float: left;
  width: 33.333%;
  padding: .75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: .75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}

</style>