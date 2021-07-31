//暴露多个发送请求的函数
import ajax from "./ajax"

//1、根据经纬度获取位置详情
export const reqAddress = (longitude,latitude)=> ajax(`/position/${latitude},${longitude}`)

//2、获取食品分类列表
export const reqFoodCategories = ()=> ajax(`/index_category`,{
    headers:{
        needToken:true
    }
})

//3、根据经纬度获取商铺列表
export const reqShops = ({longitude,latitude})=> ajax(`/shops?`,{
    params:{latitude,longitude},
    headers:{
        needToken:true
    }
})

//4.根据手机号获取验证码
export  const reqGetCode = (phone) => ajax('/sendcode',{params:{phone}})

// 5. 根据用户名密码登录
export  const reqLoginByPwd = ({username,password,capture}) => ajax({
    url:"/login_pwd",
    method:"POST",
    data:{
       name:username,
       pwd:password,
       captcha:capture,

    }
})
// 5. 根据用户名密码登录
export  const reqLoginByPhone = ({phone,code}) => ajax({
    url:"/login_sms",
    method:"POST",
    data:{
        phone,
        code,

    }
})

// 6. 自动登录  其实这个请求是需要携带token参数的但是我们一般不单独传递而是放在请求头里面
export  const reqAutoLogin = () => ajax("/auto_login",{
    headers:{
        needToken:true
    }
})