<template>
  <Card :title="`${title}`" :icon="`${icon}`">
    <div class="jc-between px-3 pt-3 nav">
      <div
        class="nav-item"
        :class="{active:active==i}"
        v-for="(category,i) in categories"
        :key="i"
        slot="car-nav"
        @click="$refs.list.swiper.slideTo(i)"
      >
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>

    <!-- 展示列表 -->
    <div class="mt-3 card-body px-3">
      <swiper
        ref="list"
        @slide-change="()=>active=$refs.list.swiper.realIndex"
        :options="{autoHeight:true}"
      >
        <swiper-slide v-for="(category,i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </Card>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array }
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>
<style scoped>
</style>