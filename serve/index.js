const KOA = require('koa');
const bodyparser = require('koa-bodyparser');
const cors = require('koa2-cors');
const static = require('koa-static');
const path = require('path')
const Routers = require('./Routes/admin/Routers')
const errorHandler = require('./middleware/error-handler')
const webIndex = require('./Routes/web/webIndex')


const app = new KOA();
app.Routers = Routers
require('./mongo/db')(app) //连接mongo数据库
app.use(bodyparser()) //解析json
app.use(cors())       //解决跨域
app.Routers()  //服务端路由
app.use(webIndex.routes(), webIndex.allowedMethods())

app.use(static(path.join(__dirname, "/uploads")))
app.use(static(__dirname, "/admin")) //托管admin静态文件
app.use(static(path.join(__dirname, "/web"))) //托管web静态文件

app.on('error', errorHandler)

app.listen(3000, () => {
    console.log("http://localhost:3000");

})
