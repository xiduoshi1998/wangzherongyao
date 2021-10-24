const mongoose = require("mongoose");

// 添加用户模型
const schema = new mongoose.Schema({
    username: { type: String },
    password: {
        select: false, //隐藏密码 
        type: String, set(val) {
            return require('bcrypt').hashSync(val, 12)  //密码加密 bcrypt
        }
    },
})


module.exports = mongoose.model('AdminUsers', schema)