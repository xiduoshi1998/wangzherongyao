import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home/home')
const Main = () => import('@/views/Main');
const Articles = () => import('@/views/Home/Articles/articles')
const Heroes = () => import('@/views/Home/Heroes/heroes')
const Video = () => import('@/views/Home/Video/videos')
const Strategy = () => import('@/views/Strategy/strategy')
const NewGame = () => import('@/views/NewGame/NewGame')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      // { path: '', redirect: '/home' },=== { path: '/', name: 'home', component: Home }
      { path: '/', name: 'home', component: Home },
      { path: '/strategy', name: 'strategy', component: Strategy },
      { path: '/newgame', name: 'newgame', component: NewGame },
      { path: '/articles/:id', name: 'articles', component: Articles, props: true }, //props: true 传的参数都映射为组件参数
      { path: '/videos/:id', name: 'video', component: Video, props: true },

    ]
  },
  { path: '/heroes/:id', component: Heroes, props: true }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
