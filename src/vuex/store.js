import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) //必须声明使用  然后在index.js入口文件里面引入store并且注册

import state from "./state";
import mutations from "./mutation";
import actions from "./actions";
import getters from "./getters";

export  default new Vuex.Store({
    state,
    mutations ,
    actions,
    getters
})

