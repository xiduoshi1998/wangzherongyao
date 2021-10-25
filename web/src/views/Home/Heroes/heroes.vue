<template>
  <div class="page-heroes">
    <div class="bg-black p-2 d-flex text-white ai-center">
      <img src="@/assets/image/logo.jpg" height="30" class="px-2" />
      <div class="flex-1">
        <span class="pr-3">王者荣耀</span>
        <span>攻略站</span>
      </div>
      <div class="fs-sm">更多英雄 &gt;</div>
    </div>
    <div class="top" :style="{'background-image':`url(${model.banner})`}">
      <div class="info text-white p-3 flex-column jc-end h-100 d-flex">
        <div class="fs-sm">{{model.title}}</div>
        <h2>{{model.name}}</h2>
        <div class="fs-sm">{{model.categories}}</div>
        <div class="d-flex jc-between">
          <div class="fs-sm" v-if="model.scores">
            <span class="mr-2">
              难度
              <span class="bg-primary scores">{{model.scores.difficult}}</span>
            </span>
            <span class="mr-2">
              技能
              <span class="bg-blue scores">{{model.scores.skills}}</span>
            </span>
            <span class="mr-2">
              攻击
              <span class="bg-red scores">{{model.scores.attack}}</span>
            </span>
            <span class="mr-2">
              生存
              <span class="bg-dark-1 scores">{{model.scores.survive}}</span>
            </span>
          </div>
          <router-link custom v-slot="{ navigate }" to="/" class="text-grey-2 fs-sm">
            <div @click="navigate">皮肤: 2</div>
          </router-link>
        </div>
      </div>
    </div>

    <div>
      <!-- 头部 -->
      <div class="px-3 bg-white">
        <div class="nav d-flex jc-around py-2 border-bottom">
          <div class="nav-item" @click="slideTo(0)" :class="{active:active==0}">
            <div>英雄初识</div>
          </div>
          <div class="nav-item" @click="slideTo(1)" :class="{active:active==1}">
            <div>进阶攻略</div>
          </div>
        </div>
      </div>

      <!--  -->
      <swiper ref="list" @slide-change="()=>active=$refs.list.swiper.realIndex">
        <swiper-slide>
          <div>
            <div class="bg-white p-3">
              <!-- 英雄介绍 -->
              <div>
                <!--button -->
                <div class="d-flex px-1">
                  <router-link
                    custom
                    v-slot="{ navigate }"
                    tag="button"
                    to="/"
                    class="flex-1 heroBtn"
                  >
                    <button @click="navigate">
                      <i class="iconfont icon-bofang"></i>
                      <span>英雄介绍视频</span>
                    </button>
                  </router-link>
                  <router-link custom v-slot="{ navigate }" to="/" class="flex-1 heroBtn ml-2">
                    <button @click="navigate">
                      <i class="iconfont icon-tupian"></i>
                      <span>一图识英雄</span>
                    </button>
                  </router-link>
                </div>
              </div>
              <!-- 技能 -->
              <div class="my-4">
                <div class="d-flex jc-around">
                  <img
                    class="icon"
                    @click="currenSkillIndex=i"
                    :class="{iconActive:currenSkillIndex==i}"
                    :src="sk.icon"
                    v-for="(sk,i) in model.skills"
                    :key="sk._id"
                    height="60"
                    width="60"
                  />
                </div>
                <!-- 技能描述 -->
                <div v-if="model.currenSkill">
                  <div class="d-flex ai-center py-3">
                    <h3>{{currenSkill.name}}</h3>
                    <span
                      class="pl-5 fs-sm text-grey-2"
                    >(冷却值: {{currenSkill.delay}} 消耗值:{{currenSkill.cost}} )</span>
                  </div>
                  <div>{{currenSkill.description}}</div>
                </div>
              </div>
            </div>
            <Card plain="false" title="出装推荐" icon="icon-kuzi1">
              <div class="p-2 border-bottom">
                <div class="fs-lg pb-3">顺风出装</div>
                <div class="d-flex jc-between">
                  <div
                    v-for="i in model.smoothly"
                    :key="i._id"
                    class="item text-center d-flex flex-column"
                  >
                    <img :src="i.icon" width="50" height="50" />
                    <span class="fs-sm">{{i.name}}</span>
                  </div>
                </div>
              </div>
              <!-- 逆风出装 -->
              <div class="p-2 border-bottom">
                <div class="fs-lg pb-3">逆风出装</div>
                <div class="d-flex jc-between">
                  <div
                    v-for="i in model.hardship"
                    :key="i._id"
                    class="item text-center d-flex flex-column"
                  >
                    <img :src="i.icon" width="50" height="50" />
                    <span class="fs-sm">{{i.name}}</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card plain="false" title="使用技巧" icon="icon-yingxiongxiangqing">
              <p class="p-2">{{model.usageTips}}</p>
            </Card>
            <Card plain="false" title="对抗技巧" icon="icon-xiangsu_wuqi">
              <p class="p-2">{{model.battleTips}}</p>
            </Card>
            <Card plain="false" title="团战思路" icon="icon-tuandui1">
              <p class="p-2">{{model. teamTips}}</p>
            </Card>
            <Card plain="false" title="英雄关系" icon="icon-tuandui1">
              <p class="fs-lg">最佳搭档</p>
              <div class="d-flex flex-column pt-2">
                <div v-for="i in model.partners" :key="i._id" class="d-flex mb-3">
                  <img :src="i.hero.avatar" width="50" height="50" />
                  <p class="flex-1 pl-2">{{i.description}}</p>
                </div>
              </div>
            </Card>
          </div>
        </swiper-slide>
        <!-- 进阶攻略 -->
        <swiper-slide>
          <div v-if="model.strategy">
            <div v-for="item in model.strategy" :key="item._id">
              <a :href="item.url" class="text-black">
                <div class="d-flex p-3 bg-white border-bottom">
                  <img :src="item.image" width="120" height="60" />
                  <div class="pl-3 d-flex flex-column flex-1">
                    <p class="flex-1 fs-sm">{{item.title}}</p>
                    <div class="fs-xxs d-flex">
                      <span class="flex-1">
                        <i class="iconfont icon-bofang fs-xs"></i>
                        {{item.play}}
                      </span>
                      <span>{{item.date | data}}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
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
      active: 0,
      currenSkillIndex: 0,
      model: {}
    };
  },
  filters: {
    data(val) {
      return dayjs(val).format("YYYY-MM-DD");
    }
  },
  computed: {
    currenSkill() {
      return this.model.skills[this.currenSkillIndex];
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      const categories = res.data.categories.map(v => v.name).join("/");
      this.model = res.data;
      this.model.categories = categories;
    },
    slideTo(index) {
      return this.$refs.list.swiper.slideTo(index);
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang='scss'>
.page-heroes {
  .top {
    height: 45vw;
    background: #fff no-repeat top center;
    background-size: 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  }
  .scores {
    display: inline-block;
    margin-left: 0.3rem;
    height: 1rem;
    width: 1rem;
    line-height: 1rem;
    text-align: center;
    border-radius: 50%;
    font-size: 0.7rem;
  }
  .heroBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    // line-height: 2.5rem;
    font-size: 0.9rem;
    background-color: #fcfcfc;
    border-radius: 5px;
    border: 1px solid #eceef0;
    i {
      color: #d59b40;
      font-size: 1.5rem;
      margin-right: 5px;
    }
  }
  .icon {
    border: 3px solid #fff;
    &.iconActive {
      border: 3px solid #d59b40;
      border-radius: 50%;
    }
  }
  .item {
    img {
      border-radius: 50%;
    }
  }
}
</style>