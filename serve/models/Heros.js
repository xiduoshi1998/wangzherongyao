const mongoose = require("mongoose");

// 添加列表模型
const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },

})

module.exports = mongoose.model('Heros', schema)

