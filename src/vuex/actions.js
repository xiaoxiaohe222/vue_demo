//多个间接更新状态数据的对象
//包括异步请求和逻辑代码
import  {reqAddress,reqFoodCategories,reqShops } from "@/api";
import { SAVE_ADDRESS ,SAVE_CATEGORIES,SAVE_SHOPS} from "./mutation_type"


export  default {

    //请求提交保存地址
    async [SAVE_ADDRESS]({commit,state}){
        const {longitude,latitude} = state;
     const result =  await  reqAddress(longitude,latitude)
        if (result.code === 0){
            commit(SAVE_ADDRESS,result.data)
        }
    },
    //请求提交保存商品分类列表
    async [SAVE_CATEGORIES]({commit}){

        const result =  await  reqFoodCategories()
        if (result.code === 0){
            commit(SAVE_ADDRESS,result.data)
        }
    },
    //请求提交保存地址
    async [SAVE_SHOPS]({commit,state}){
        const {longitude,latitude} = state;
        const result =  await  reqShops({longitude,latitude})
        if (result.code === 0){
            commit(SAVE_ADDRESS,result.data)
        }
    }

}