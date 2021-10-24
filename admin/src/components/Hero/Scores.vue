<template>
  <div>
    <el-form-item label="难度">
      <el-rate :max="9" style="margin:0.6rem" show-score v-model="model.scores.difficult"></el-rate>
    </el-form-item>

    <el-form-item label="技能">
      <el-rate :max="9" style="margin:0.6rem" show-score v-model="model.scores.skills"></el-rate>
    </el-form-item>

    <el-form-item label="攻击">
      <el-rate :max="9" style="margin:0.6rem" show-score v-model="model.scores.attack"></el-rate>
    </el-form-item>

    <el-form-item label="生存">
      <el-rate :max="9" style="margin:0.6rem" show-score v-model="model.scores.survive"></el-rate>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {}
};
</script>
<style scoped>
</style>