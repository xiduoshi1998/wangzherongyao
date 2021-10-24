<template>
  <div>
    <h1>{{id?'编辑':'新建'}}管理员</h1>
    <el-form
      @submit.native.prevent="save('ruleForm')"
      :model="model"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
    >
      <!-- 新建分类 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" :prop="id?'{}':'password'">
        <el-input v-model="model.password" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VerifyForm } from "../../verify/formVerify";
export default {
  data() {
    return {
      id: this.$route.params.id,
      model: {
        name: ""
      },
      // 校验规则
      rules: VerifyForm
    };
  },
  methods: {
    // 修改分类,创建子分类
    async save(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return this.$message.warning("内容不能为空");

        let result;
        this.id &&
          (result = await this.$http.put(
            `rest/adminUsers/${this.id}`,
            this.model
          ));
        result = await this.$http.post("rest/adminUsers", this.model);
        this.$router.push("/adminUsers/list");
        this.$message.success("保存成功");
      });
    },

    async fetch() {
      let result = await this.$http.get(`rest/adminUsers/${this.id}`);
      this.model = { ...this.model, ...result.data };
    }
  },
  created() {
    this.id && this.fetch();
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
  min-width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  min-width: 178px;
  height: 178px;
  display: block;
}
</style>