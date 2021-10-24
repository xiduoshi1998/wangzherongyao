<template>
  <div>
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <el-form
      @submit.native.prevent="save('ruleForm')"
      :model="model"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
    >
      <el-tabs type="border-card">
        <!-- 基础信息 -->
        <el-tab-pane label="基础信息">
          <el-form-item label="名称" prop="name">
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <!-- 称号 -->
          <el-form-item label="称号" prop="title">
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <!-- 类型 -->
          <el-form-item label="类型" prop="categories">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 操作难度 -->
          <Score :model="model"></Score>

          <!-- 出装 -->
          <div>
            <el-form-item label="顺风出装">
              <el-select v-model="model.smoothly" value-key="name" multiple>
                <el-option
                  v-for="item of items"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="逆风出装">
              <el-select v-model="model.hardship" value-key="name" multiple>
                <el-option
                  v-for="item of items"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>

          <!-- 小提示 -->
          <Tips :model="model" />
          <!-- 图片上传 -->
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+`/upload`"
              :headers="headers"
              :show-file-list="false"
              :on-success="res=>$set(model,'avatar',res.url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 背景图片 -->
          <el-form-item label="背景图片">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+`/upload`"
              :headers="headers"
              :show-file-list="false"
              :on-success="res=>$set(model,'banner',res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="banner" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>

        <!--添加技能  -->
        <el-tab-pane label="技能" name="skills">
          <el-button @click="model.skills.push({})">
            <i class="el-icon-plus">添加技能</i>
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>

              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗值">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>

              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>

              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL+`/upload`"
                  :show-file-list="false"
                  :on-success="res=>$set(item,'icon',res.url)"
                  :headers="headers"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 添加英雄搭档 -->
        <el-tab-pane label="英雄" name="partners">
          <el-button @click="model.partners.push({})">
            <i class="el-icon-plus">添加英雄</i>
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item,i) in model.partners" :key="i">
              <el-form-item label="英雄">
                <el-select v-model="item.hero" filterable>
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.partners.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 进阶攻略 -->
        <el-tab-pane label="英雄攻略" name="strategy">
          <el-button @click="model.strategy.push({})">
            <i class="el-icon-plus">英雄攻略</i>
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item,i) in model.strategy" :key="i">
              <el-form-item label="标题">
                <el-input v-model="item.title"></el-input>
              </el-form-item>
              <el-form-item label="播放量">
                <el-input v-model="item.play"></el-input>
              </el-form-item>
              <el-form-item label="链接(URL)">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label="日期">
                <el-date-picker
                  v-model="item.date"
                  value-format="timestamp"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="封面">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL+`/upload`"
                  :show-file-list="false"
                  :on-success="res=>$set(item,'image',res.url)"
                  :headers="headers"
                >
                  <img v-if="item.image" :src="item.image" class="banner" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item>
                <el-button type="danger" size="small" @click="model.strategy.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top:1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VerifyForm } from "../../verify/formVerify";
import Score from "../../components/Hero/Scores";
import Tips from "../../components/Hero/Tips";
import model from "../../components/common/module";
export default {
  data() {
    return {
      id: this.$route.params.id,
      categories: [], //类型数据
      items: [],
      heroes: [],

      model: {
        name: "",
        avatar: "",
        scores: {},
        skills: [],
        partners: [],
        strategy: [],
        items1: [],
        items3: [],
        skills: []
      },

      // 校验规则
      rules: VerifyForm
    };
  },
  components: {
    Score,
    Tips
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
    save(formName) {
      this.$refs[formName].validate(async valid => {
        model.create(this, valid, this.id, "heros", this.model);
      });
    },

    async fetch() {
      let result = await this.$http.get(`rest/heros/${this.id}`);
      this.model = { ...this.model, ...result.data };
    },

    // 获取称号数据
    async fetchCategories() {
      let result = await this.$http.get("rest/categories");
      let id = "614b45d8fbeeaa6d9c7de0b7";

      // 建议服务器过滤
      result.data.map(item => {
        if (item.parent && item.parent._id == id) {
          this.categories.push(item);
        }
      });
    },

    // 获取装备数据
    async fetchItems() {
      let result = await this.$http.get("rest/items");
      this.items = result.data;
    },
    async fetchHeroes() {
      let result = await this.$http.get("rest/heros");
      this.heroes = result.data;
    }

    // 上传图片成功回调
    // afterUpload(res) {
    //   // this.$set(this.model, "avatar", res.url);
    //   this.model.avatar = res.url;
    // }
  },
  created() {
    this.id && this.fetch();
    this.fetchItems();
    this.fetchHeroes();
    this.fetchCategories();
  }
};
</script>
<style scoped>
.el-input {
  width: 300px;
}
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
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
.banner {
  width: 20rem;
  height: 10rem;
  display: block;
}
</style>