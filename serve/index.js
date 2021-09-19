const KOA = require('koa');
const bodyparser = require('koa-bodyparser');
const cors = require('koa2-cors');
const static = require('koa-static');
const path = require('path')

const adminRouter = require('./Routes/admin');
const upload = require('./Routes/uploads')

const app = new KOA();
require('./mongo/db')(app) //连接mongo数据库
app.use(bodyparser()) //解析json
app.use(cors())       //解决跨域
app.use(adminRouter.routes(), adminRouter.allowedMethods());       //路由
app.use(upload.routes(), upload.allowedMethods())

app.use(static(path.join(__dirname, "/uploads")))

app.listen(3000, () => {
    console.log("http://localhost:3000");
})
