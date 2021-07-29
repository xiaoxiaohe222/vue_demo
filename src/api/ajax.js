import axios from "axios";
import qs from "qs"
const instance = axios.create({
    baseURL:"/api",
    timeout: 2000,
    //headers: {'X-Custom-Header': 'foobar'}
});
//配置请求拦截器
instance.interceptors.request.use(function (config){
        let  data = config.data;
        if (data instanceof  Object){
            config.data = qs.stringify(data) ;  //如果是post请求json格式请求体参数转为urlencoded
        }
    return config;

})
//配置响应拦截器
instance.interceptors.response.use(
    (response)=>{
        return  response.data
    },
    (error)=>{
        alert(error.message)
        return new Promise(()=>{}) //中断promise链
    }
)


export default  instance;