const Router = require('koa-router');

const admin = new Router({ prefix: "/admin/api/rest/:resource" });

const { create, getList, getListById, putCategorie, removeCategories } = require('../../controller/adminController')
const { models, virifyAuth } = require('../../middleware/model')


admin.post('/', virifyAuth, models, create) //创建列表
admin.get('/', virifyAuth, models, getList)  //获取列表
admin.get('/:id', virifyAuth, models, getListById)  //根据id查找数据
admin.put('/:id', virifyAuth, models, putCategorie) //编辑
admin.delete('/:id', virifyAuth, models, removeCategories) //删除

module.exports = admin