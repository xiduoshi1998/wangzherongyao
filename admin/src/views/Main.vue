<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router unique-opend :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>内容管理
          </template>
          <category site="/items" createName="新建物品" listName="物品列表"></category>
          <category site="/heros" createName="新建英雄" listName="英雄列表"></category>
          <category site="/articles" createName="新建文章" listName="文章列表"></category>
          <category site="/videos" createName="新建视频" listName="视频列表"></category>
        </el-submenu>

        <!-- 运营管理 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>运营管理
          </template>
          <!-- 广告位 -->
          <category site="/ads" createName="新建管理员" listName="广告位列表"></category>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message"></i>系统管理
          </template>
          <category site="/categories" createName="新建分类" listName="分类列表"></category>
          <category site="/adminUsers" createName="新建管理员" listName="管理员列表"></category>
        </el-submenu>
      </el-menu>
    </el-aside>

    <!-- 用户 -->
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand" style=" z-index:10 ;">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item command="3">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="username">{{user.username}}</span>
      </el-header>

      <!-- 路由 -->
      <el-main>
        <router-view :key="$route.path" />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import category from "../components/category";
export default {
  data() {
    return {
      user: this.$route.query
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "3":
          this.$confirm(`将退出当前账号，${this.user.username}`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$message.error("退出登陆成功");
              localStorage.clear();
              this.$router.push("/login");
            })
            .catch(err => {
              this.$message.info = "已取消退出";
            });
      }
    }
  },
  components: {
    category
  }
};
</script>
 
<style>
@font-face {
  font-family: myFirstFont;
  src: url("./font/Blazed.ttf");
}
.username {
  font-family: "myFirstFont";
  font-size: 25px;
  color: black;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-main {
  overflow: visible;
}
</style>

