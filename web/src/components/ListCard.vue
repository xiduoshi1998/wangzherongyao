<template>
  <Card :title="`${title}`" :icon="`${icon}`" :plain="plain">
    <div class="jc-between px-3 pt-3 nav overflow-x">
      <div
        class="nav-item"
        :class="{active:active==i}"
        v-for="(category,i) in categories"
        :key="i"
        slot="car-nav"
        @click="$refs.list.swiper.slideTo(i)"
      >
        <div class="nav-link text-center text-ellipse px-1">{{category.name}}</div>
      </div>
    </div>

    <!-- 展示列表 -->
    <div>
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
    plain: { type: String },
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
.text-ellipse {
  display: inline-block;
  text-overflow: ellipsis;
}
.overflow-x {
  overflow-x: scroll;
}
</style>