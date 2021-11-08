const errorTyp = require('../constants/error-type')
class adminController {
    // 创建分类
    async create(ctx, next) {
        let { parent } = ctx.request.body
        try {
            if (!parent) {
                ctx.request.body.parent = null
            }
            let model = await ctx.model.create(ctx.request.body);
            ctx.body = model
        } catch (error) {
            console.log(error);
        }
    };

    // 分类列表
    async getList(ctx, next) {
        let queryOptions = {};
        let name = ctx.model.modelName;
        if (name === 'Categories' || name === 'Video') {
            queryOptions.populate = 'parent'
        }
        let items = await ctx.model.find().setOptions(queryOptions);
        ctx.body = items
    };

    // 获取当前点击编辑 的数据
    async getListById(ctx, next) {
        let items = await ctx.model.findById(ctx.params.id);
        ctx.body = items
    }

    // 编辑
    async putCategorie(ctx, next) {
        try {
            let { id } = ctx.params
            let body = ctx.request.body
            let model = await ctx.model.findByIdAndUpdate(id, body)
            ctx.body = model
        } catch (error) {
            console.log(error);
        }
    }

    //删除
    async removeCategories(ctx, next) {
        let { id } = ctx.params
        let { username } = await ctx.model.findById(id)
        if (username == 'admin') {
            const err = new Error(errorTyp.UNPERMISSION)
            return ctx.app.emit('error', err, ctx)
        }
        await ctx.model.findByIdAndDelete(id)
        ctx.body = { success: true }
    }


};


module.exports = new adminController()