<template>
  <div>
    <h1>{{id?'编辑':'新建'}}物品</h1>
    <el-form @submit.native.prevent="save">
      <!-- 新建分类 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <!-- 图片上传 -->
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+`/upload`"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      model: {
        name: ""
      }
    };
  },
  methods: {
    // 修改分类,创建子分类
    async save() {
      let result;
      if (this.id) {
        result = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        result = await this.$http.post("rest/items", this.model);
      }

      if (this.model.name) {
        this.$router.push("/items/list");
        this.$message.success("保存成功");
      } else {
        this.$message.warning("名字不能为空");
      }
    },

    // 获取分类
    async fetchParent() {
      let result = await this.$http.get("rest/items");
      this.parents = result.data;
    },

    upload() {
      this.$http.post("/upload", this.model);
    },

    async fetch() {
      let result = await this.$http.get(`rest/items/${this.id}`);
      this.model = { ...this.model, ...result.data };
    },

    // 上传图片成功回调
    afterUpload(res) {
      this.$set(this.model, "icon", res.url);
    }
  },
  created() {
    this.fetchParent();
    this.fetch();
  }
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>