<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="$http.defaults.baseURL+`/upload`"
      :show-file-list="false"
      :on-success="res=>$set(item,name,res.url)"
      :headers="headers"
    >
      <img v-if="item[name]" :src="item[name]" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    name: { typr: String, required: true },
    item: { typr: Object, required: true }
  },
  computed: {
    headers() {
      return {
        Authorization: "Bearer " + (localStorage.token || "")
      };
    }
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
</style>