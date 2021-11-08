import axios from "axios"

const http = axios.create({
    baseURL: 'http://localhost:3000/web/api',
    // VUE_APP_API_URL 传了就用本身 否则用域名下的
    // baseURL: process.env.VUE_APP_API_URL || '/web/api'
});
export default http
