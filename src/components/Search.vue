<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input v-model="searchName" type="text" placeholder="enter the name you search"/>
      <button @click="search">Search</button>


    </div>
  </section>
</template>

<script>
export default {
  name: "Search",
  data(){
    return {
      searchName:""
    }
  },
  methods:{
    search(){
      //发送请求数据
      this.$store.dispatch("search",this.searchName)

      this.searchName=""
    }
  }
}
</script>

<style lang="less" scoped>

</style>