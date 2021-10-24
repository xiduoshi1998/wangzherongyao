<template>
  <div>
    <h1>{{id?"编辑":"新建"}}视频</h1>
    <el-form @submit.native.prevent="save" label-width="120px">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <!-- 新建分类 -->
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="视频(URL)">
        <el-input v-model="model.video"></el-input>
      </el-form-item>
      <el-form-item label="播放量">
        <el-input v-model="model.play"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+`/upload`"
          :show-file-list="false"
          :on-success="res=>this.model.picture=res.url"
          :headers="headers"
        >
          <img v-if="model.picture" :src="model.picture" class="avatar" />
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
import { VerifyForm } from "../../verify/formVerify";
export default {
  data() {
    return {
      id: this.$route.params.id,
      parents: [],
      model: {
        title: "",
        parent: "",
        picture: "",
        video: "",
        play: 0
      }
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
    async save() {
      if (!this.model.title) {
        return this.$message.warning("名字不能为空");
      }
      let result;
      if (this.id) {
        result = await this.$http.put(`rest/video/${this.id}`, this.model);
      } else {
        result = await this.$http.post("rest/video", this.model);
      }

      this.$router.push("/videos/list");
      this.$message.success("保存成功");
    },

    // 编辑数据 请求数据
    async fatch() {
      let item = await this.$http.get(`rest/video/${this.id}`);
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