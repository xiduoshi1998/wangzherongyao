<template>
  <div>
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <el-form @submit.native.prevent="save">
      <!-- 新建分类 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <!-- 称号 -->
      <!-- <el-form-item label="称号">
        <el-input v-model="model.title"></el-input>
      </el-form-item>-->

      <!-- 类型 -->
      <!-- <el-form-item label="类型">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item of categories" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>-->

      <!-- 操作难度 -->
      <!-- <div>
        <el-form-item label="难度">
          <el-rate :max="9" style="margin:0.6rem" v-model="model.difficult"></el-rate>
        </el-form-item>

        <el-form-item label="技能">
          <el-rate :max="9" style="margin:0.6rem" v-model="model.skill"></el-rate>
        </el-form-item>

        <el-form-item label="攻击">
          <el-rate :max="9" style="margin:0.6rem" v-model="model.attack"></el-rate>
        </el-form-item>

        <el-form-item label="生存">
          <el-rate :max="9" style="margin:0.6rem" v-model="model.survival"></el-rate>
        </el-form-item>
      </div>-->

      <!-- 出装 -->
      <!-- <div>
        <el-form-item label="顺风出装">
          <el-select v-model="model.equip" multiple>
            <el-option v-for="item of items" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="逆风出装">
          <el-select v-model="model.setback" multiple>
            <el-option v-for="item of items" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </div>-->

      <!-- 图片上传 -->
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+`/upload`"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
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
      categories: [], //类型数据
      items: [],
      model: {
        name: "",
        avatar: ""
      }
    };
  },
  computed: {},
  methods: {
    // 修改分类,创建子分类
    async save() {
      let result;
      if (this.id) {
        result = await this.$http.put(`rest/heros/${this.id}`, this.model);
      } else {
        result = await this.$http.post("rest/heros", this.model);
      }

      if (this.model.name) {
        this.$router.push("/heros/list");
        this.$message.success("保存成功");
      } else {
        this.$message.warning("名字不能为空");
      }
    },

    async fetch() {
      let result = await this.$http.get(`rest/heros/${this.id}`);
      this.model = { ...this.model, ...result.data };
    },

    // // 获取称号数据
    // async fetchCategories() {
    //   let result = await this.$http.get("rest/categories");
    //   result.data.map(item => {
    //     if (item.parent.id == 25) {
    //       this.categories.push(item);
    //     }
    //   });
    // },

    // // 获取装备数据
    // async fetchitems() {
    //   let result = await this.$http.get("rest/items");
    //   this.items = result.data;
    // },

    // 上传图片成功回调
    afterUpload(res) {
      // this.$set(this.model, "avatar", res.url);
      this.model.avatar = res.url;
    }
  },
  created() {
    this.id && this.fetch();
    // this.fetchitems();
    // this.fetchCategories();
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