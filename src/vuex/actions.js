//包含多个间接更新状态的方法
//里面可以包含异步代码和逻辑代码
import {REQUESTING, REQUEST_SUCCESS, REQUEST_ERROR} from "./type"
import axios from "axios";

export default {

    async search({commit}, searchName) {
        //发送ajax之前更新数据
        commit(REQUESTING)
       try {
           const response = await axios.get("https://api.github.com/search/users", {
               params: {
                   q: searchName
               }
           })
           let users = response.data.items.map(item => ({
                id:item.login,
               url:item.url,
               html_url:item.avatar_url

           }))
           commit(REQUEST_SUCCESS,users)


       }catch (error) {
           commit(REQUEST_ERROR,error.message)
       }


    }

}