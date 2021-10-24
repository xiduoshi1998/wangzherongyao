const mongoose = require("mongoose");

// 添加轮播图模型
const schema = new mongoose.Schema({
    name: { type: String },
    items: [
        {
            image: { type: String },
            url: { type: String },
        }
    ]

})


module.exports = mongoose.model('Ads', schema)