<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router unique-opend :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>内容管理
          </template>
          <!-- 物品 -->
          <el-menu-item-group>
            <template slot="title">分组</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>

          <!-- 英雄 -->
          <el-menu-item-group>
            <template slot="title">分组</template>
            <el-menu-item index="/heros/create">新建英雄</el-menu-item>
            <el-menu-item index="/heros/list">英雄列表</el-menu-item>
          </el-menu-item-group>

          <!-- 文章 -->
          <el-menu-item-group>
            <template slot="title">分组</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">分组</template>
            <el-menu-item index="/videos/create">新建视频</el-menu-item>
            <el-menu-item index="/videos/list">视频列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 运营管理 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>运营管理
          </template>
          <!-- 广告位 -->
          <el-menu-item-group>
            <template slot="title">分组</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message"></i>系统管理
          </template>
          <el-menu-item-group>
            <template slot="title">分组</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">分组</template>
            <el-menu-item index="/adminUsers/create">新建管理员</el-menu-item>
            <el-menu-item index="/adminUsers/list">管理员列表</el-menu-item>
          </el-menu-item-group>
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

