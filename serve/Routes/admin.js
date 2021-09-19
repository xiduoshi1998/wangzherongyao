const Router = require('koa-router');

const admin = new Router({ prefix: "/admin/api/rest/:resource" });

const { create, getList, getListById, putCategorie, removeCategories } = require('../controller/adminController')
const models = require('../middleware/model')

console.log(getList);
admin.post('/', models, create) //创建列表
admin.get('/', models, getList)  //获取列表
admin.get('/:id', models, getListById)  //根据id查找数据
admin.put('/:id', models, putCategorie) //编辑
admin.delete('/:id', models, removeCategories)
module.exports = admin