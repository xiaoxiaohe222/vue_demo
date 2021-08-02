import {SAVE_SHOPDATA, ADD_NUM, DEC_NUM,EMPTY_CART,SAVE_CARTFOODS} from "@/vuex/mutation_type";
import {reqShopData} from "@/api";
import Vue from "vue"


let state = {
    shopData: {},
    cartFoods:[]  //里面全部存放我们需要加入购物车的food组成的数组
}
let mutations = {
    //轻松购物车
    [EMPTY_CART](state){
        //必须要先让里面的num变为0
        state.cartFoods.forEach((food)=>{
            food.num = 0
        })

        state.cartFoods.splice(0,state.cartFoods.length)
    },


    [SAVE_SHOPDATA](state, shopData) {
        state.shopData = shopData;
    },
    [SAVE_CARTFOODS](state, cartFoods) {
        state.cartFoods = cartFoods;
    },
    //让food的数量加1
    [ADD_NUM](state, {food}) {
        if (food.num > 0) {
            food.num++
        } else{
            Vue.set(food, 'num', 1);
            //我们只需要添加一次即可
            state.cartFoods.push(food)
        }


    },
    //让food的数量减1
    [DEC_NUM](state, {food}) {
        if (food.num > 0) {
            food.num--;
            if (food.num <= 0){
                state.cartFoods.splice(state.cartFoods.indexOf(food),1)
            }
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
let getters = {
    totalNum(state){
        return state.cartFoods.reduce((pre,food)=>{return pre+food.num},0)
    },
    totalMoney(state){
        return state.cartFoods.reduce((pre,food)=>{return pre+food.num*food.price},0)
    },


}


export default {
    state,
    mutations,
    actions,
    getters

}