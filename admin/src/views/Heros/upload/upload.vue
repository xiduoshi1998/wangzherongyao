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
</style>