import Vue from 'vue'
const requireComponent = require.context(
    // 其组件目录的相对路径
    '@/components/',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /\.(vue|js)$/
);
requireComponent.keys().forEach(fileName => {
    if (fileName === './index.js') return
    // 获取组件配置
    const componentConfig = requireComponent(fileName);
    // 获取组件的命名(可以根据自己项目的实际情况进行修改)
    const componentName = fileName.replace(/^\.\//, '').replace(/\/\index.vue$/, '').replace('.vue', '');
    // 全局注册组件
    Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，否则回退到使用模块的根。
        componentConfig.default || componentConfig
    );
});