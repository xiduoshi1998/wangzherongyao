// mongoose
const Categories = require('../models/Categories')
const Articles = require('../models/Articles');
const Heroes = require('../models/Heros');
const Ads = require('../models/Ads');
const Video = require('../models/Video');

class webController {

    // 获取新闻列表数据
    async getNewList(ctx, next) {
        const parent = await Categories.findOne({
            name: '新闻分类'
        });
        const cats = await Categories.aggregate([
            { $match: { parent: parent._id } }, //查询条件
            {//关联 articles
                $lookup: {
                    from: 'articles',
                    localField: "_id",
                    foreignField: "categories",
                    as: "newsList"
                }
            },
            {//拿 newsList的五条数据 
                $addFields: {
                    newsList: { $slice: ['$newsList', 5] }
                }
            }
        ])
        // 插入热门
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            newsList: await Articles.find().where({
                categories: { $in: subCats }
            }).populate('categories').limit(5).lean()
        })
        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = (cat.name === '热门') ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })
        ctx.body = cats
    }

    // 获取文章详情
    async getarticles(ctx, next) {
        const { id } = ctx.request.params;
        const data = await Articles.findById(id).lean();
        ctx.body = data
    }

    // 英雄详情
    async getHeroes(ctx, next) {
        const { id } = ctx.request.params;
        const data = await Heroes.findById(id).populate('categories smoothly hardship partners.hero').lean();
        ctx.body = data
    }

    // 英雄分类
    async getHeroesList(ctx, next) {
        // 1.先找到顶级分类
        const parent = await Categories.findOne({
            name: '英雄分类'
        });
        // 2.聚合查询 关联
        const cats = await Categories.aggregate([
            { $match: { parent: parent._id } }, //查询条件
            {//关联  模型
                $lookup: {
                    from: 'heroses',  //关联模型
                    localField: "_id", //主键
                    foreignField: "categories", //关联的外键
                    as: "heroList"
                }
            },
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            heroList: await Heroes.find().where({
                categories: { $in: subCats }
            }).limit(10).lean()
        })
        ctx.body = cats
    }

    // 轮播图
    async getBanner(ctx, next) {
        const HomeID = '61540c2410f190183e18ac24'; //首页
        const strategyID = "617fc6a932e5679385369c85"; //攻略中心
        let id = ctx.params.id == 'home' ? HomeID : strategyID
        let data = await Ads.findById(id).lean();
        ctx.body = data
    }

    // IP新游
    async genewgame(ctx, next) {
        const id = '6172d64fb0d3cba2dbcdbc02';
        const data = await Ads.findById(id).lean();
        ctx.body = data

    }

    // 首页视频
    async getHomeVideo(ctx, next) {
        const parent = await Categories.findOne({
            name: 'wonderful'
        });

        let cat = await Categories.aggregate([
            { $match: { parent: parent._id } }, //找到上级是nice的数据
            {//关联 a
                $lookup: {
                    from: 'videos',
                    localField: "_id",
                    foreignField: "parent",
                    as: "categories"
                }
            },
        ]);
        cat = cat.filter((item, i) => {
            switch (i) {
                case 0:
                    item.name = '英雄攻略';
                    break
                case 1:
                    item.name = '精品栏目';
                    break
                case 2:
                    item.name = '精彩视频';
                    break
            }
            return i < 3

        });

        ctx.body = cat
    }
    // 攻略中心
    async getStrategy(ctx, next) {
        let { id } = ctx.request.params;
        const parent = await Categories.findOne({
            name: id
        });
        const cat = await Categories.aggregate([
            { $match: { parent: parent._id } },
            {//关联 
                $lookup: {
                    from: 'videos',
                    localField: "_id",
                    foreignField: "parent",
                    as: "categories"
                }
            }
        ])
        ctx.body = cat
    }

    // 视频详情
    async getVideo(ctx, next) {
        const { id } = ctx.request.params;
        const data = await Video.findById(id).lean();
        ctx.body = data
    }

}

module.exports = new webController()