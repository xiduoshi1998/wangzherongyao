const mongoose = require("mongoose");

// 添加英雄模型
const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    banner: { type: String },
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Categories' }],
    // 评分
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number },
    },
    // 技能
    skills: [{
        icon: { type: String },
        name: { type: String },
        delay: { type: String }, //冷却植
        cost: { type: String },  //消耗
        description: { type: String },
        tips: { type: String },
    }],
    // 顺 逆风 出装
    smoothly: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Items" }],
    hardship: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Items" }],

    // 提示
    usageTips: { type: String }, //使用技巧
    battleTips: { type: String },//战斗技巧
    teamTips: { type: String },  //团战技巧

    // 英雄搭档
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Heros' },
        description: { type: String }
    }],

    strategy: [{
        title: { type: String },
        image: { type: String },
        play: { type: Number },
        date: { type: Number },
        url: { type: String }
    }]

})
//
module.exports = mongoose.model('Heros', schema, 'heroses')

