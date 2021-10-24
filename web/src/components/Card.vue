<template>
  <div class="card mt-3 px-2 bg-white">
    <!-- 头部 -->
    <div class="d-flex pt-3 mx-2" :class="{'card-item':!plain,'pb-3':!plain}">
      <i class="iconfont icon-item1" :class="`${icon}`"></i>
      <div class="fs-xl flex-1 px-2">{{title}}</div>
      <i class="iconfont icon-item2" v-if="!plain">&#xec1c;</i>
    </div>

    <!-- 主题 -->
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { typeof: String, required: true },
    icon: { typeof: String, required: true },
    plain: { typeof: Boolean }
  }
};
</script>
<style lang='scss'>
.card-item {
  border-bottom: 1px solid #d4d9de;
}
</style>