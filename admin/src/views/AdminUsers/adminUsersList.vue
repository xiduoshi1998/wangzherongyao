<template>
  <div>
    <h2>物品列表</h2>
    <el-table :data="item" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>

      <!-- 编辑 -->
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push({path:`/adminUsers/edit/${scope.row._id}`})"
          >编辑</el-button>

          <el-button size="mini" type="danger" @click="remove(scope.row) ">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: []
    };
  },

  computed: {},
  methods: {
    // 获取物品列表
    async fetch() {
      let result = await this.$http.get("rest/adminUsers");
      this.item = result.data;
    },

    // 删除
    async remove(row) {
      this.$confirm(`此操作将永久删除该分类,${row.username}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let result = await this.$http.delete(`rest/adminUsers/${row._id}`);
          if (result.status !== 200) return;
          this.$message.success("删除成功");
          this.fetch();
        })
        .catch(() => {
          this.$message.info = "已取消删除";
        });
    }
  },

  created() {
    this.fetch();
  }
};
</script>
<style scoped>
</style>