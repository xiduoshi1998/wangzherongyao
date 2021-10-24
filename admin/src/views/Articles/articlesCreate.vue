<template>
  <div>
    <h1>{{id?"编辑":"新建"}}文章</h1>
    <el-form
      @submit.native.prevent="save('ruleForm')"
      label-width="120px"
      :model="model"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item label="所属分类" prop="categories">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 新建分类 -->
      <el-form-item label="标题" prop="title">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VerifyForm } from "../../verify/formVerify";
import model from "../../components/common/module";
import { VueEditor } from "vue2-editor"; //富文本
export default {
  data() {
    return {
      id: this.$route.params.id,
      categories: [],
      model: {
        categories: []
      },
      // 校验规则
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        categories: [{ required: true, message: "请输入分类", trigger: "blur" }]
      }
    };
  },
  components: { VueEditor },
  methods: {
    // 富文本自定义图片上传
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      // 图片上传
      const { data } = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", data.url);
      resetUploader();
    },

    save(formName) {
      this.$refs[formName].validate(async valid => {
        model.create(this, valid, this.id, "articles", this.model);
      });
    },

    // 编辑数据 请求数据
    async fatch() {
      let item = await this.$http.get(`rest/articles/${this.id}`);
      this.model = { ...this.model, ...item.data };
    },

    async fetchCategories() {
      let result = await this.$http.get("rest/categories");
      this.categories = result.data;
    }
  },

  created() {
    this.id && this.fatch();
    this.fetchCategories();
  }
};
</script>
<style scoped>
</style>