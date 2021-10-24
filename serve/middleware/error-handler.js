const errorTyp = require('../constants/error-type')
const errorHandler = async (error, ctx) => {
    let message, status;
    switch (error.message) {
        case errorTyp.USER_DOES_NOT_EXISTS:
            message = '用户不存在哦',
                status = 400
            break
        case errorTyp.PASSWORD_IS_INCORRENT:
            message = '密码错误啦',
                status = 400
            break
        case errorTyp.TOKEN_NOT_NULL:
            message = '请登陆',
                status = 401
            break
        case errorTyp.TOKEN_IS_INCORRENT:
            message = 'token失效，请重新登陆',
                status = 401
            break
        case errorTyp.UNPERMISSION:
            message = '没有操作权限',
                status = 402
            break
        // 
        default:
            status = 404;
            message = 'NOT FOUND'
    }
    ctx.body = { message },
        ctx.status = status

}

module.exports = errorHandler