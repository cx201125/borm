import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path:'/home',
    // name:'Home',
    component:() => import('../views/Home.vue'),
    children:[
      {
        path: '/',
        redirect:'index'
      },
      {
        name:'adminList',
        path:'admin/list',
        component:() => import('@/views/user/UserIndex.vue')

      },

      {
        name:'dormBuild',
        path:'dormbuild/list',
        component:() => import('@/views/dormbuild/DormBuild.vue')

      },
      {
        name:'dorm',
        path:'dorm/list/:dbId',
        component:() => import('@/views/dorm/Dorm.vue')

      },
      {
        name:'index',
        path:'index',
        component:() => import('@/views/Index.vue')

      },
      {
        name:'echarts',
        path:'statistics/echarts',
        component:() => import('@/views/statistics/Echarts.vue')

      },


    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login' && to.path === '/') {
    next();
  } else {
    let token = localStorage.getItem('token');
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router
