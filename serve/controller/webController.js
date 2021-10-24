// mongoose
const Categories = require('../models/Categories')
const Articles = require('../models/Articles');
const Heroes = require('../models/Heros');
const Ads = require('../models/Ads');
const Video = require('../models/Video');

class webController {
    // 文章录入
    async newInit(ctx, next) {
        // 取新闻分类里面的数据
        const parent = await Categories.findOne({ name: '新闻分类' })
        const cats = await Categories.find().where({ parent: parent }).lean();

        const newsTitle = ["嫦娥源·梦皮肤特效研讨会开启啦~", "第二十七期大神问答精彩回顾", "王者荣耀携手多名艺术家讲述敦煌故事", "就是辣么燃!《魂斗罗：归来》新川渝版本了解一下？", "周年庆主题头像框方案票选结果公布", "10月9日体验服停机更新公告", "10月8日王者宝藏-限时点券大放送活动任务异常说明", "10月8日王者宝藏-限时点券大放送活动异常说明", "10月8日全服不停机更新公告", "9月30日体验服停机更新公告", "王者宝藏-限时点券大放送活动开启公告", "【微信用户专属】微信小程序“游戏礼品站”购买“钟馗-乐园奇幻夜”皮肤抽免单活动", "嫦娥源·梦皮肤特效研讨会开启啦~", "周年庆主题头像框方案票选结果公布", "【一转千年】集腰鼓兑好礼活动开启公告", "KPL预报丨广州TTG vs 成都AG，谁能用胜利收官第一轮？", "秋季赛快讯：武汉ES五连胜完结第一轮，长沙TES.A掉入A组", "【简讯】长沙TES.A遗憾掉入2021KPL秋季赛第二轮A组", "秋季赛快讯：厦门VG阻击北京WB，Qy橘右京致命收割", "【简讯】XYG晋级2021KPL秋季赛常规赛第二轮A组"]

        const newsList = newsTitle.map(title => {
            // 随机取分类
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2),
                title: title,
            }
        })
        await Articles.deleteMany({});
        await Articles.insertMany(newsList)
        ctx.body = newsList
    }

    // 英雄录入
    async heroesInit(ctx, next) {
        // 英雄资料 
        const heroes = require('./heroes/heroes');

        await Heroes.deleteMany({})
        // const rawData = heroes
        for (let cat of heroes) {
            // 跳过热门
            if (cat.name === '热门') continue;

            // 找到当前数据在数据库的所属分类
            const category = await Categories.findOne({
                name: cat.name
            });
            cat.heroes = cat.heroes.map(hero => {
                hero.categories = [category];
                return hero
            })
            // 录入英雄
            await Heroes.insertMany(cat.heroes)
        }
        const heroList = await Heroes.find()
        ctx.body = heroList
    }

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
        const id = '61540c2410f190183e18ac24';
        const data = await Ads.findById(id).lean();
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
            name: '视频分类'
        });
        const cat = await Categories.aggregate([
            { $match: { parent: parent._id } },
            {//关联 a
                $lookup: {
                    from: 'videos',
                    localField: "_id",
                    foreignField: "parent",
                    as: "HomeVideo"
                }
            },
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