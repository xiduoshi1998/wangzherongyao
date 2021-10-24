<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in bannerCats" :key="item._id">
        <a :href="item.url">
          <img :src="item.image" width="100%" />
        </a>
      </swiper-slide>

      <div class="swiper-pagination pagination-home px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- 导航 -->
    <HomeNav />

    <ListCard title="新闻资讯" icon="icon-w_xinwen" :categories="newsCats">
      <!-- 自行展示子组件数据 -->
      <template #items="{category}">
        <router-link
          :to="`articles/${news._id}`"
          custom
          v-slot="{ navigate }"
          class="py-2 fs-sm d-flex"
          v-for="(news,i) in category.newsList"
          :key="i"
        >
          <div @click="navigate">
            <span class="pr-2 text-primary">[{{news.categoryName}}]</span>
            <span class="flex-1 text-dark text-ellipse pr-2">{{news.title}}</span>
            <span class="text-dark-1">{{news.updatedAt | data}}</span>
          </div>
        </router-link>
      </template>
    </ListCard>
    <ListCard title="英雄列表" icon="icon-yingxiongxiangqing" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap text-center" style="margin:0 -0.5rem">
          <router-link
            custom
            v-slot="{ navigate }"
            :to="`heroes/${hero._id}`"
            class="p-2 heroItem"
            v-for="(hero,i) in category.heroList"
            :key="i"
          >
            <div @click="navigate">
              <img :src="hero.avatar" />
              <div>{{hero.name}}</div>
            </div>
          </router-link>
        </div>
      </template>
    </ListCard>

    <ListCard title="精彩视频" icon="icon-w_xinwen" :categories="videoCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap jc-between">
          <router-link
            custom
            v-slot="{ navigate }"
            :to="`videos/${video._id}`"
            class="videoItem py-2 text-center"
            v-for="(video,i) in category.HomeVideo"
            :key="i"
          >
            <div @click="navigate">
              <img :src="video.picture" height="90" class="w-100" />
              <p class="text-ellipse2 w-100">{{video.title}}</p>
              <div class="d-flex ai-center pt-1">
                <span class="fs-xs flex-1 pr-5">
                  <i class="iconfont icon-bofang fs-lg"></i>
                  {{video.play}}
                </span>
                <span class="fs-xs">{{video.updatedAt | data}}</span>
              </div>
            </div>
          </router-link>
        </div>
      </template>
    </ListCard>
  </div>
</template>

<script>
import HomeNav from "@/views/Home/Children/HomeNav";
import dayjs from "dayjs"; //格式化时间
export default {
  data() {
    return {
      newsCats: [],
      heroCats: [],
      bannerCats: [],
      videoCats: [],
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
  filters: {
    data(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  components: { HomeNav },

  methods: {
    // 新闻
    async fetchNewCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
      // console.log(this.newsCats);
    },
    // 英雄
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    },
    // 轮播图
    async fetchBanner() {
      const res = await this.$http.get("banner");
      this.bannerCats = res.data.items;
    },
    // 视频
    async fetchVideo() {
      const res = await this.$http.get("video/home");
      this.videoCats = res.data;
    }
  },
  created() {
    this.fetchNewCats();
    this.fetchHeroCats();
    this.fetchBanner();
    this.fetchVideo();
  }
};
</script>
<style  lang='scss'>
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

.icon-item1 {
  font-size: 20px;
}
.icon-item2 {
  font-size: 20px;
}
.heroItem {
  width: 20%;
  img {
    width: 100%;
  }
}
.videoItem {
  width: 49%;
}
</style>
