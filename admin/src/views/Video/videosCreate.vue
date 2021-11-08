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
      <el-form-item label="视频时间">
        <el-input v-model="model.time"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <upload :item="model" name="picture"></upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VerifyForm } from "../../verify/formVerify";
import upload from "../Heros/upload/upload";
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
        play: "",
        time: ""
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
  components: {
    upload
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
</style>