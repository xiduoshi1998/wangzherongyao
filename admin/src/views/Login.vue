<template>
  <div class="login-container">
    <el-card class="login-card">
      <div slot="header" class="login-header">
        <div class="imageBox">
          <img src="../image/16328256379441.jpg" alt />
        </div>
        <span>Sign In</span>
      </div>

      <el-form @submit.native.prevent="login">
        <el-form-item label="账号">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: "admin",
        password: "123456"
      }
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      localStorage.token = res.data.token;
      this.$router.push({ path: "/", query: res.data.user });
      this.$message.success("登陆成功");
    }
  }
};
</script>
<style scoped>
.login-card {
  width: 30rem;
  margin: 10rem auto;
}
.login-header {
  color: #ea6f5a;
  font-size: 30px;
  font-weight: 900;
}
.imageBox {
  text-align: center;
}
.imageBox img {
  border-radius: 70px;
}
</style>