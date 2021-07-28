<template>
  <div id="app">
  <Search/>
    <Main/>
  </div>
</template>

<script>
import Search from "@/components/Search";
import Main from "@/components/Main";

export default {
  name: 'App',

  components:{
    Search,
    Main
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
