import Vue from 'vue'
import App from './App.vue'
import store from "@/vuex/store";

//import "../css/bootstrap.less"
import "../public/css/bootstrap.less"
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')


