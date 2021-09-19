const Router = require("koa-router");
const { ImageHanler } = require('../middleware/multer')
const upload = new Router();


// 图片上传接口
upload.post('/admin/api/upload', ImageHanler, (ctx, next) => {
    let file = ctx.req.file
    ctx.response.set('content-type', 'image/jpeg');
    file.url = `http://localhost:3000/${file.filename}`
    ctx.body = ctx.req.file
})

module.exports = upload