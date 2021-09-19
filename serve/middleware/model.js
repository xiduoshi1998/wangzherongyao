
let models = async (ctx, next) => {
    let modelName = ctx.params.resource;
    modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    ctx.model = require(`../models/${modelName}`);
    await next()

}

module.exports = models