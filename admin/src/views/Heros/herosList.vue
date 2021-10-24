<template>
  <div>
    <h2>分类列表</h2>
    <el-table :data="item" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="英雄称号"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:3em" alt />
        </template>
      </el-table-column>

      <!-- 编辑 -->
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push({path:`/heros/edit/${scope.row._id}`})"
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
    // 获取分类列表
    async fetch() {
      let { data } = await this.$http.get("rest/heros");
      this.item = data;
    },

    // 删除
    async remove(row) {
      this.$confirm(`此操作将永久删除该分类,${row.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let result = await this.$http.delete(`rest/heros/${row._id}`);
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