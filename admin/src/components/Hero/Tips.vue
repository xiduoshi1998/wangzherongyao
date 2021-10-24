<template>
  <div>
    <el-form-item label="使用技巧">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="model.usageTips"
        style="width:500px"
      ></el-input>
    </el-form-item>

    <el-form-item label="对抗技巧">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="model.battleTips"
        style="width:500px"
      ></el-input>
    </el-form-item>

    <el-form-item label="团队思路">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="model.teamTips"
        style="width:500px"
      ></el-input>
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
  }
};
</script>
<style scoped>
</style>