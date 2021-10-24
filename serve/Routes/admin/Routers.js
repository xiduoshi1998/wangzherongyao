const fs = require('fs')

const Routers = function () {
    fs.readdirSync(__dirname).forEach(file => { //把当前文件夹的路由循环
        if (file == 'Routers.js') return
        const router = require(`./${file}`)  //导入循环的路由
        this.use(router.routes(), router.allowedMethods()) //加载路由
    })
}

module.exports = Routers
