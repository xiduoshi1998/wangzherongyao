const mongoose = require("mongoose");

// 添加列表模型
const schema = new mongoose.Schema({
    name: { type: String },
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Categories' }, //ref 关联的数据库
});

// schema.virtual('children', {
//     localField: "_id",
//     foreignField: 'parent',
//     justOne: false,
//     ref: 'Categories'
// })

// // 关联 Articles
// schema.virtual('newsList', {
//     localField: "_id",
//     foreignField: "categories",
//     justOne: false,
//     ref: 'Articles'
// })


module.exports = mongoose.model('Categories', schema)