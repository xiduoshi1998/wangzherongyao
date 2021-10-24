
class model {
    async create(_this, valid, id, resource, model) {
        // 写入/修改数据库 请求的封装
        if (valid) {
            let result;
            if (id) {
                result = await _this.$http.put(
                    `rest/${resource}/${id}`,
                    _this.model
                );
            } else {
                result = await _this.$http.post(`rest/${resource}`, model);
            }
            _this.$router.push(`/${resource}/list`);
            _this.$message.success("保存成功");
        } else {
            return _this.$message.warning("内容不能为空");
        }
    }

}

export default new model()

