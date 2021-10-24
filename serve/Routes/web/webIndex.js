const Router = require('koa-router');
const web = new Router({ prefix: '/web/api' })

// 数据库逻辑
const {
    getNewList, getHeroesList, newInit,
    heroesInit, getarticles, getHeroes,
    getBanner, getHomeVideo, getVideo,
    genewgame
} = require('../../controller/webController')

// 自动插入文章标题 以及两个分类
web.get('/news/init', newInit);

// 英雄录入
web.get('/heroes/init', heroesInit)

web.get('/news/list', getNewList);
web.get('/heroes/list', getHeroesList);
web.get('/articles/:id', getarticles);
web.get('/heroes/:id', getHeroes);
web.get('/banner', getBanner);
web.get('/newgame', genewgame);
web.get('/video/home', getHomeVideo);
web.get('/video/:id', getVideo);
module.exports = web