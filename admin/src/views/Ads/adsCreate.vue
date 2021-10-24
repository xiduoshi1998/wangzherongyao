<template>
  <div>
    <h1>{{id?'编辑':'新建'}}广告位</h1>
    <el-form
      @submit.native.prevent="save('ruleForm')"
      :model="model"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
    >
      <!-- 新建分类 -->
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="广告位">
        <el-button @click="model.items.push({})">
          <i class="el-icon-plus"></i>添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="16" v-for="(item,i) in model.items" :key="i">
            <el-form-item label="跳转链接 (URL) ">
              <el-input v-model="item.url"></el-input>
            </el-form-item>

            <el-form-item label="图片" style="margin-top:0.5rem">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL+`/upload`"
                :show-file-list="false"
                :on-success="res=>$set(item,'image',res.url)"
                :headers="headers"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" size="small" @click="model.items.splice(i,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
        name: "",
        items: []
      },
      // 校验规则
      rules: VerifyForm
    };
  },
  computed: {
    headers() {
      return {
        Authorization: "Bearer " + (localStorage.token || "")
      };
    }
  },
  methods: {
    // 修改分类,创建子分类
    async save(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let result;
          if (this.id) {
            result = await this.$http.put(`rest/ads/${this.id}`, this.model);
          } else {
            result = await this.$http.post("rest/ads", this.model);
          }
          this.$router.push("/ads/list");
          this.$message.success("保存成功");
        } else {
          return this.$message.warning("内容不能为空");
        }
      });
    },

    async fetch() {
      let result = await this.$http.get(`rest/ads/${this.id}`);
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