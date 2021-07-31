import axios from "axios";
import qs from "qs"
import router from "../router"

import {Indicator} from 'mint-ui';

const instance = axios.create({
    baseURL: "/api",
    timeout: 20000,
    //headers: {'X-Custom-Header': 'foobar'}
});
//配置请求拦截器
instance.interceptors.request.use(function (config) {
   // console.log(config);
    //设置发送请求前的loading效果
    Indicator.open();
    //如果是post请求json格式请求体参数转为urlencoded
    let data = config.data;
    if (data instanceof Object) {
        config.data = qs.stringify(data);
    }


    //首先判断是不是登录请求 如果是登录请求则直接放行
    if(config.headers.needToken){
        let token = localStorage.getItem('user_token')
        if(token){
            config.headers.authorization = token
        }else{// 没有token的情况， 没有必要自动登录
            throw Error('请先登录')
        }
    }

    return config



})
//配置响应拦截器
instance.interceptors.response.use(
    (response) => {
        Indicator.close(); //关闭loading加载效果

        return response.data
    },
    (error) => {

        Indicator.close(); //关闭loading加载效果
        //首先判断是请求拦截器的错误还是后台的错误
        if (!error.response) {
            //throw抛出的错误
           alert(error.message)
            if (router.currentRoute.path !== '/login') {
                router.replace("/login")
            }
        } else {
            if(error.response.status === 401){
                if (router.currentRoute.path !== '/login') {
                    router.replace("/login")
                }
            }else {
                alert("请求出错")
            }
        }

        return new Promise(() => {
        })
    }
)


export default instance;