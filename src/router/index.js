import Vue from 'vue'
import VueRouter from "vue-router";

import MSite from "@/pages/MSite/MSite";
import Search from "@/pages/Search/Search";
import Order from "@/pages/Order/Order";
import Profile from "@/pages/Profile/Profile";
import Login from "@/pages/Login/Login";
Vue.use(VueRouter)

export default  new VueRouter({
    mode:"history",
    routes:[
        {
            path:"/msite",
            component:MSite,
            meta:{
                isShowFooter: true
            }
        },
        {
            path:"/search",
            component:Search,
            meta:{
                isShowFooter: true
            }
        },
        {
            path:"/order",
            component:Order,
            meta:{
                isShowFooter: true
            }
        },
        {
            path:"/profile",
            component:Profile,
            meta:{
                isShowFooter: true
            }
        },
        {
            path:"/login",
            component:Login,
            meta:{
                isShowFooter: false
            }
        },
        {
            path:"/",
            redirect:"/msite"
        }




    ]
})