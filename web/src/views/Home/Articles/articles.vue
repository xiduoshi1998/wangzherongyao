<template>
  <div class="page-article">
    <div class="d-flex py-3 px-2 title">
      <div class="iconfont icon-fanhui pr-1 text-blue" @click="$router.back(-1)"></div>
      <div class="flex-1 fs-lg text-blue text-weight text-ellipse">{{model.title}}</div>
      <div class="text-grey">{{model.updatedAt|data}}</div>
    </div>

    <div v-html="model.body" class="body px-4 fs-lg"></div>
  </div>
</template>

<script>
import dayjs from "dayjs"; //格式化时间
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    }
  },
  filters: {
    data(val) {
      return dayjs(val).format("YYYY/MM/DD");
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang='scss'>
.title {
  border-bottom: 1px solid #cccccc;
}
.page-article {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      max-width: 100%;
      height: 100%;
    }
  }
}
</style>