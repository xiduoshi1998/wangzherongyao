const multer = require('koa-multer');

const uploadImage = multer({
    dest: './uploads'
})
const ImageHanler = uploadImage.single('file');

module.exports = { ImageHanler }