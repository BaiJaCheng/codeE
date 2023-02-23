import { createRouter, createWebHashHistory } from 'vue-router'
import login from "../views/login/Login";
import {getPower} from "@/api/nav";
import {userLoginAccess} from "@/api/user";



const routes = [
    //登录页面
  {
    path: '/',
    name: 'login',
    component: login
  },
    //主页面
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/home/Home.vue'),
    //定向到user页面
    redirect: '/employee',
    //二级路由
    children: [
        {
            path: '/product',
            name: 'product',
            component: () => import(/* webpackChunkName: "about" */ '../views/product/Product.vue'),
        }
    ]
  }
]



function dynamic() {
    let uId = window.localStorage.getItem("uId");
    userLoginAccess({uId}).then((res) => {
        let str = Array.from(new Set([...res.data.uPower, ...res.data.rPower])).filter(item => item !== ',').join(",");
        window.localStorage.setItem("power", str)
        getPower({str}).then((res => {
            ///截取字符串
            res.data.forEach((item) => {
                const paths = item.nUrl.split("/")[0]; // users
                //addRouter动态添加路由
                router.addRoute(
                    'home', {
                        path: `/${paths}`,
                        name: `${item.nName}`,
                        component: () => import('@/views/' + item.nUrl + '/' + item.nUrl + '.vue'),
                    }
                )
            });
        }));
    })
}



const router = createRouter({
    base: '/dist',
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
    //判断是否登录
    if(localStorage.getItem('uId')){
        dynamic();
    }
    next();
})

export default router
