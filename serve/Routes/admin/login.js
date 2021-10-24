const fs = require('fs')
const jwt = require('jsonwebtoken')

const Router = require('koa-router');
const AdminUsers = require("../../models/AdminUsers")
const PRIVATE_KEY = fs.readFileSync('./keys/private_key.pem')
const errorTyp = require('../../middleware/error-handler')

const login = new Router();

// 登陆 发放token
login.post('/admin/api/login', async (ctx, next) => {
    let { password, username } = ctx.request.body;
    const user = await AdminUsers.findOne({ username }).select('+password') //取出密码 默认不取出;
    if (!user) {
        const err = new Error(errorTyp.USER_DOES_NOT_EXISTS)
        return ctx.app.emit('error', err, ctx)
    }

    let isValid = require('bcrypt').compareSync(password, user.password) //密码匹配
    if (!isValid) {
        const err = new Error(errorTyp.PASSWORD_IS_INCORRENT)
        return ctx.app.emit('error', err, ctx)
    }

    // 返回token
    const token = jwt.sign({ id: user._id }, PRIVATE_KEY, {
        expiresIn: 60 * 60 * 24,  //有时效
        algorithm: 'RS256'   //算法
    })
    ctx.body = { token, user: { username, id: user._id } }

})

module.exports = login