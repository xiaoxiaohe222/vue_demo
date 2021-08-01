import {SAVE_SHOPDATA, ADD_NUM, DEC_NUM} from "@/vuex/mutation_type";
import {reqShopData} from "@/api";
import Vue from "vue"

let state = {
    name: "hello",
    shopData: {}
}
let mutations = {
    [SAVE_SHOPDATA](state, shopData) {
        state.shopData = shopData;
    },
    //让food的数量加1
    [ADD_NUM](state, {food}) {
        if (food.num > 0) {
            food.num++
        } else
            Vue.set(food, 'num', 1)
    },
    //让food的数量减1
    [DEC_NUM](state, {food}) {
        if (food.num > 0) {
            food.num--
        }
    }
}
let actions = {
    async getShopData({commit}) {
        let result = await reqShopData()

        if (result.code === 0) {
            commit(SAVE_SHOPDATA, result.data)
        }

    },
    //改变num的action
    changeNum({commit},{isAdd,food}){
        if (isAdd) commit(ADD_NUM, {food})
        else commit(DEC_NUM, {food})
    }


}
let getters = {}


export default {
    state,
    mutations,
    actions,
    getters

}