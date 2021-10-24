const mongoose = require("mongoose");

// 添加文章模型
const schema = new mongoose.Schema({
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Categories' }], //ref 关联的数据库
    body: { type: String }
}, {
    timestamps: true
})


module.exports = mongoose.model('Articles', schema)