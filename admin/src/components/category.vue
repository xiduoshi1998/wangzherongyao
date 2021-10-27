<template>
  <div>
    <el-menu-item-group>
      <template slot="title">分组</template>
      <el-menu-item :index="site+'/create'">{{createName}}</el-menu-item>
      <el-menu-item :index="site+'/list'">{{listName}}</el-menu-item>
    </el-menu-item-group>
  </div>
</template>

<script>
export default {
  props: {
    site: { type: String, required: true },
    createName: { type: String, required: true },
    listName: { type: String, required: true }
  }
};
</script>
<style scoped>
</style>