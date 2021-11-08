<template>
  <div id="strategy">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in bannerCats" :key="item._id">
        <a :href="item.url">
          <img :src="item.image" class="w-100" />
        </a>
      </swiper-slide>
      <div class="swiper-pagination pagination-home px-3 pb-2" slot="pagination"></div>
    </swiper>

    <!-- 热门视频 -->
    <div class="news bg-white mt-2">
      <div class="newsHaed p-3 border-bottom d-flex">
        <strong class="fs-xl flex-1">热门视频</strong>
        <ul v-for="(item,i) in hotCats" :key="i">
          <li
            class="mx-2"
            :class="{active:i==newsActive}"
            @click="$refs.list.swiper.slideTo(i)"
          >{{item.name}}</li>
        </ul>
      </div>
      <!-- 主体 -->
      <swiper
        ref="list"
        :options="{autoHeight:true}"
        @slide-change="()=>newsActive=$refs.list.swiper.realIndex"
      >
        <swiper-slide v-for="(item,i) in hotCats" :key="i">
          <ul>
            <li v-for="(hot,index) in item.categories" :key="hot._id">
              <!-- 热门视频 第一个视频 -->
              <div v-if="index==0">
                <a :href="hot.video" class="p-2 border-bottom d-flex text-dark">
                  <img :src="hot.picture" width="140" height="60" />
                  <div class="pl-3">
                    <p class="fs-sm">
                      <i>{{index+1}}.</i>
                      {{hot.title}}
                    </p>
                    <span class="text-grey-2 icon-bofang iconfont fs-xxs">{{hot.play}}</span>
                  </div>
                </a>
              </div>
              <!-- 热门视频  2 开始的视频 -->
              <div v-else>
                <a :href="hot.video" class="p-2 mx-2 border-bottom d-flex text-dark">
                  <i>{{index+1}}.</i>
                  <p class="fs-sm flex-1 text-ellipse">{{hot.title}}</p>
                  <span class="fs-xxs text-grey-2 icon-bofang iconfont">{{hot.play}}</span>
                </a>
              </div>
            </li>
          </ul>
        </swiper-slide>
      </swiper>
      <div class="p-2 border-bottom text-center">查看完整榜单</div>
    </div>

    <ListCard
      :title="res.data.name"
      icon="icon-tupian"
      plain="false"
      :categories="res.data"
      v-for="res in allCate"
      :key="res._id"
    >
      <template #items="{category}">
        <div class="d-flex jc-between flex-wrap">
          <div v-for="item in category.categories" :key="item._id" class="mt-3 videoItem">
            <a :href="item.video">
              <img :src="item.picture" height="90" class="w-100" />
              <p class="text-ellipse2">{{item.title}}</p>
              <span class="fs-xs iconfont icon-bofang">{{item.play}}</span>
            </a>
          </div>
        </div>
      </template>
    </ListCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerCats: [],
      hotCats: [], //最热视频
      newsActive: 0,
      allCate: [],
      swiperOption: {
        autoplay: {
          delay: 3000
        },
        pagination: {
          el: ".pagination-home"
        }
      }
    };
  },
  methods: {
    // 轮播图
    async fetchBanner() {
      const res = await this.$http.get("banner/strategy");
      this.bannerCats = res.data.items;
    },
    async fetchAll() {
      let data = [
        this.$http.get("strategy/hot"),
        this.$http.get("strategy/nice"),
        this.$http.get("strategy/wonderful"),
        this.$http.get("strategy/match")
      ];
      const res = await Promise.all(data);
      res.filter((item, i) => {
        if (i !== 0) {
          console.log(i, item);
          switch (i) {
            case 1:
              item.data.name = "精品栏目";
              break;
            case 2:
              item.data.name = "精品赛事";
              break;
            case 3:
              item.data.name = "精品视频";
              break;
          }
          return this.allCate.push(item);
        }
        this.hotCats = item.data;
      });
    }
  },

  created() {
    this.fetchBanner();
    this.fetchAll();
  }
};
</script>
<style lang='scss'>
.pagination-home {
  text-align: right !important;
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: #ffffff;
    &.swiper-pagination-bullet-active {
      background: #4b67af;
    }
  }
}
.active {
  color: #db9e3f;
  border-bottom: 3px solid #db9e3f;
}
.videoItem {
  width: 49%;
}
</style>