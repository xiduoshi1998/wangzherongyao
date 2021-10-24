// 数据库连接
module.exports = app => {
    const mongoose = require("mongoose");
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
        useNewUrlParser: true
    })
    mongoose.connection.on('connected', function () {
        console.log('Mongoose connection open to ');
    });
    const a = require('require-all')(__dirname + '/../models')
}