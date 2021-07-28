//包含多个间接更新状态的方法
import {REQUESTING,REQUEST_SUCCESS,REQUEST_ERROR} from "./type"


//里面可以包含异步代码和逻辑代码
export  default {
    [REQUESTING](state){
        state.firstView = false;
        state.isLoading = true;



    },
    [REQUEST_SUCCESS](state,users){
        state.isLoading = false;
        state.users = users
    },
    [REQUEST_ERROR](state,errMsg){
        state.isLoading = false;
        state.errMsg = errMsg
    }

}