module.exports = {
    outputDir: __dirname + '/../serve/web',
    // publicPath: process.env.NODE_ENV === 'production'
    //     ? '/web/'
    //     : '/',
    //先写一个configureWebpack 表示你准备配置webpageconfig
    configureWebpack: {
        //配置路径相关的时候用resolve 可以解决路径相关的问题
        resolve: {
            //别名ps：.vue等相关的其实已经写了，这里只需要写我们自己需要的
            alias: {
                //默认有@  他指向的是：src
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    },

    lintOnSave: false
}