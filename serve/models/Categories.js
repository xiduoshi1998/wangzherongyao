const mongoose = require("mongoose");

// 添加列表模型
const schema = new mongoose.Schema({
    name: { type: String },
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Categories' }, //ref 关联的数据库

})


module.exports = mongoose.model('Categories', schema)