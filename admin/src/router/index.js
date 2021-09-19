import Vue from 'vue'
import VueRouter from 'vue-router';
const Main = () => import('../views/Main')

// 分类
const Create = () => import('../views/Categories/create');
const List = () => import('../views/Categories/list');

// 物品
const itemCreate = () => import('../views/items/itemCreate');
const itemList = () => import('../views/items/itemList')

// 英雄
const herosCreate = () => import('../views/Heros/herosCreate');
const herosList = () => import('../views/Heros/herosList')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
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
      { path: '/heros/list', component: herosList }
    ]
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
