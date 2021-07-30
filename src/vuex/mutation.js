//多个直接更新状态数据的对象
import {SAVE_ADDRESS,SAVE_CATEGORIES,SAVE_SHOPS,SAVE_USER,SAVE_TOKEN} from "@/vuex/mutation_type";

export  default {

    [SAVE_ADDRESS](state,address){
        state.address = address

    },
    [SAVE_CATEGORIES](state,categories){
        state.categories = categories.map((category)=>{
            category.image_url = 'https://fuss10.elemecdn.com'+category.image_url
            return category
        })


    },
    [SAVE_SHOPS](state,shops){
        state.shops  =  shops.map((shop)=>{
            shop.image_path = 'https://fuss10.elemecdn.com'+shop.image_path
            return shop;
        })
    },
    [SAVE_USER](state,user){
        state.user = user

    },
    [SAVE_TOKEN](state,token){
        state.token = token

    }

}