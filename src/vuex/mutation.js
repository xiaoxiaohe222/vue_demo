//多个直接更新状态数据的对象
import {SAVE_ADDRESS,SAVE_CATEGORIES,SAVE_SHOPS} from "@/vuex/mutation_type";

export  default {

    [SAVE_ADDRESS](state,address){
        state.address = address

    },
    [SAVE_CATEGORIES](state,categories){
        state.categories = categories

    },
    [SAVE_SHOPS](state,shops){
        state.shops = shops

    }

}