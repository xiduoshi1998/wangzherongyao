<template>
  <div>
    <h1>{{id?"编辑":"新建"}}分类</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <!-- 新建分类 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
      parents: [],
      model: {
        name: "",
        parent: ""
      }
    };
  },
  methods: {
    async save() {
      if (!this.model.name) {
        return this.$message.warning("名字不能为空");
      }
      let result;
      if (this.id) {
        result = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        result = await this.$http.post("rest/categories", this.model);
      }

      this.$router.push("/categories/list");
      this.$message.success("保存成功");
    },

    // 编辑数据 请求数据
    async fatch() {
      let item = await this.$http.get(`rest/categories/${this.id}`);
      this.model = item.data;
    },

    async fetchParent() {
      let result = await this.$http.get("rest/categories");
      this.parents = result.data;
    }
  },

  created() {
    this.id && this.fatch();
    this.fetchParent();
  }
};
</script>
<style scoped>
</style>