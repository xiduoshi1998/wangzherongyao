import axios from 'axios';
import Vue from "vue"
import router from "../router/index"

const http = axios.create({
    // baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    baseURL: 'http://localhost:3000/admin/api',
})

// 请求拦截
http.interceptors.request.use(config => {
    if (localStorage.token) {
        config.headers.Authorization = "Bearer " + (localStorage.token || '')
    }
    return config
}, err => {
    return Promise.reject(err)
})

// 响应拦截
http.interceptors.response.use(res => {
    return res
}, err => {
    let message = err.response.data.message
    if (message) {
        Vue.prototype.$message.error(message)
    }
    if (err.response.status !== 200) {
        Vue.prototype.$message.error(message)
        router.push('/login')
    }
})
export default http