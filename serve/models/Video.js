const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: { type: String },
    picture: { type: String }, //图片
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Categories' },//所属分类
    play: { type: String },  //播放量
    video: { type: String },
    time: { type: String }
}, {
    timestamps: true
})

module.exports = mongoose.model('Video', schema, 'videos')