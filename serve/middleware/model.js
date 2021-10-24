const fs = require('fs')

const jwt = require('jsonwebtoken')

const PUBLIC_KEY = fs.readFileSync('./keys/public_key.pem')
const errorTyp = require('../constants/error-type')
const AdminUsers = require('../models/AdminUsers')


const models = async (ctx, next) => {
    let modelName = ctx.params.resource;
    modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    ctx.model = require(`../models/${modelName}`);
    await next()

}

// 验证token
const virifyAuth = async (ctx, next) => {
    const token = String(ctx.headers.authorization || '').replace('Bearer ', '');
    if (!token) {
        const err = new Error(errorTyp.TOKEN_NOT_NULL)
        return ctx.app.emit('error', err, ctx)
    }

    // token过期
    try {
        const { id } = jwt.verify(token, PUBLIC_KEY);
        ctx.user = await AdminUsers.findById(id);
        if (!ctx.user) {

            const err = new Error(errorTyp.UNPERMISSION)
            return ctx.app.emit('error', err, ctx)
        }
    } catch (error) {
        if (error) {
            const err = new Error(errorTyp.TOKEN_IS_INCORRENT)
            return ctx.app.emit('error', err, ctx)
        }
    }
    await next()
}






module.exports = { models, virifyAuth }