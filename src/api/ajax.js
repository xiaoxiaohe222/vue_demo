import axios from "axios";
import qs from "qs"

import { Indicator } from 'mint-ui';
const instance = axios.create({
    baseURL:"/api",
    timeout: 20000,
    //headers: {'X-Custom-Header': 'foobar'}
});
//配置请求拦截器
instance.interceptors.request.use(function (config){
    //设置发送请求前的loading效果
            Indicator.open();
        let  data = config.data;
        if (data instanceof  Object){
            config.data = qs.stringify(data) ;  //如果是post请求json格式请求体参数转为urlencoded
        }
    return config;

})
//配置响应拦截器
instance.interceptors.response.use(
    (response)=>{
        Indicator.close(); //关闭loading加载效果

        return  response.data
    },
    (error)=>{
        Indicator.close(); //关闭loading加载效果

        alert(error.message)
        return new Promise(()=>{}) //中断promise链
    }
)


export default  instance;