import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
import * as API from "./api/index"

import "./veevalidate"


import router from "./router"
import Header from "@/components/Header/Header";
import Star from "@/components/Star/Star";
import store from "@/vuex/store";


Vue.prototype.$API = API;



Vue.config.productionTip = false
Vue.component("Header",Header)
Vue.component("Star",Star)



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


