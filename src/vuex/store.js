import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)
import state from "@/vuex/state";
import mutations from "@/vuex/mutation";
import actions from "@/vuex/actions";
import getters from "@/vuex/getters";
import shop from "@/vuex/modules/shop";

export  default  new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        shop
    }
})