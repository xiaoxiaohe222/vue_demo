//多个间接更新状态数据的对象
//包括异步请求和逻辑代码
import {reqAddress, reqFoodCategories, reqShops} from "@/api";
import {DEL_TOKEN,DEL_USER,SAVE_ADDRESS, SAVE_CATEGORIES, SAVE_SHOPS, SAVE_USER, SAVE_TOKEN} from "./mutation_type"


export default {
    //请求删除user
    [DEL_USER]({commit}){
        localStorage.removeItem("user_token")
        commit(DEL_TOKEN)
        commit(DEL_USER)
    },

    //请求提交保存地址
    async [SAVE_ADDRESS]({commit, state}) {
        const {longitude, latitude} = state;
        const result = await reqAddress(longitude, latitude)
        if (result.code === 0) {
            commit(SAVE_ADDRESS, result.data)
        }
    },
    //请求提交保存商品分类列表
    async [SAVE_CATEGORIES]({commit}) {

        const result = await reqFoodCategories()

        if (result.code === 0) {
            commit(SAVE_CATEGORIES, result.data)

        }
    },
    //请求提交保存地址
    async [SAVE_SHOPS]({commit, state}) {
        const {longitude, latitude} = state;
        const result = await reqShops({longitude, latitude})
        if (result.code === 0) {
            commit(SAVE_SHOPS, result.data)
        }
    },
    [SAVE_USER]({commit},user) {
        const {token} = user;
        localStorage.setItem("user_token",token)
        commit(SAVE_TOKEN,token)
        delete  user.token;
        commit(SAVE_USER,user)
    }


}