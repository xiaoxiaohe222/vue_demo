import Vue from 'vue'
import VueRouter from "vue-router";

//import MSite from "@/pages/MSite/MSite";
const MSite = () => import("@/pages/MSite/MSite")
import Search from "@/pages/Search/Search";
import Order from "@/pages/Order/Order";
import Profile from "@/pages/Profile/Profile";
import Login from "@/pages/Login/Login";
import Shop from "@/pages/Shop/Shop";
import Food from "@/pages/Shop/Food/Food";
import Rating from "@/pages/Shop/Rating/Rating";
import Info from "@/pages/Shop/Info/Info";


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
            path:"/shop",
            component:Shop,
            children:[
                {
                    path:"food",
                    component:Food
                },
                {
                    path:"rating",
                    component:Rating
                },
                {
                    path:"info",
                    component:Info
                },
                {
                    path:"/shop",
                    redirect:"/shop/food"
                }

            ]

        },
        {
            path:"/",
            redirect:"/msite"
        }  //路由重定向




    ]
})