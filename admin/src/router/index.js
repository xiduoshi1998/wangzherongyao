import Vue from 'vue'
import VueRouter from 'vue-router';
const Main = () => import('../views/Main')
const Login = () => import('../views/Login')

const Home = () => import('../views/Home/homePage')
// 分类
const Create = () => import('../views/Categories/create');
const List = () => import('../views/Categories/list');

// 物品
const itemCreate = () => import('../views/items/itemCreate');
const itemList = () => import('../views/items/itemList')

// 英雄
const herosCreate = () => import('../views/Heros/herosCreate');
const herosList = () => import('../views/Heros/herosList')

// 文章
const articlesCreate = () => import('../views/Articles/articlesCreate');
const articlesList = () => import('../views/Articles/articlesList')

// 广告
const adsCreate = () => import('../views/Ads/adsCreate');
const adsList = () => import('../views/Ads/adsList')

// 管理员
const adminUserCreate = () => import('../views/AdminUsers/adminUsersCreate');
const adminUserList = () => import('../views/AdminUsers/adminUsersList')

// 视频
const videosCreate = () => import('../views/Video/videosCreate');
const videosList = () => import('../views/Video/videoslist')

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login },

  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '', redirect: '/home' },
      { path: '/home', component: Home },
      { path: '/categories/create', component: Create },
      { path: '/categories/edit/:id', component: Create },
      { path: '/categories/list', component: List },

      // 物品
      { path: '/items/create', component: itemCreate },
      { path: '/items/edit/:id', component: itemCreate },
      { path: '/items/list', component: itemList },

      // 英雄
      { path: '/heros/create', component: herosCreate },
      { path: '/heros/edit/:id', component: herosCreate },
      { path: '/heros/list', component: herosList },

      // 文章
      { path: '/articles/create', component: articlesCreate },
      { path: '/articles/edit/:id', component: articlesCreate },
      { path: '/articles/list', component: articlesList },

      // 广告
      { path: '/ads/create', component: adsCreate },
      { path: '/ads/edit/:id', component: adsCreate },
      { path: '/ads/list', component: adsList },

      // 管理员
      { path: '/adminUsers/create', component: adminUserCreate },
      { path: '/adminUsers/edit/:id', component: adminUserCreate },
      { path: '/adminUsers/list', component: adminUserList },

      // 视频
      { path: '/videos/create', component: videosCreate },
      { path: '/videos/edit/:id', component: videosCreate },
      { path: '/videos/list', component: videosList },
    ]
  },
]



const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 当前跳转的路径
//   // next 放行 
//   if (to.path === '/login') return next();
//   const tokenStr = window.localStorage.getItem('token');
//   if (!tokenStr) {
//     Vue.prototype.$message.error('请登陆')
//     return next('/login');
//   }

// next()
// })


export default router
