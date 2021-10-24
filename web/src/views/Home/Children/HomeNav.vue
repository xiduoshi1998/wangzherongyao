<template>
  <div class="nav-icons bg-white mt-3 text-center pt-3">
    <div class="d-flex flex-wrap">
      <div class="nav-item mb-3 py-2" v-for="(item,i) in navItem" :key="i">
        <a :href="item.url" class="text-black">
          <i class="sprite" :class="[item.icon]"></i>
          <div>{{item.name}}</div>
        </a>
      </div>
    </div>
    <div class="py-2 bg-light text-dark-1" @click="unfold">收起</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navItem: [
        {
          icon: "sprite-news",
          name: "爆料站",
          url: "https://pvp.qq.com/m/m201706/coming/index.htm"
        },
        {
          icon: "sprite-news2",
          name: "故事站",
          url: "https://pvp.qq.com/m/m201706/coming/index.htm"
        },
        {
          icon: "sprite-news3",
          name: "周边商城",
          url: "https://pvp.qq.com/mall/m/?biz=yxzj#/"
        },
        {
          icon: "sprite-news4",
          name: "体验服",
          url: "https://pvp.qq.com/cp/a20161116tyf/page01.htm"
        }
      ],
      itemIndex: true
    };
  },
  methods: {
    unfold() {
      if (this.itemIndex) {
        this.navItem = [
          {
            icon: "sprite-news",
            name: "爆料站",
            url: "https://pvp.qq.com/m/m201706/coming/index.htm"
          },
          {
            icon: "sprite-news2",
            name: "故事站",
            url: "https://pvp.qq.com/m/m201706/coming/index.htm"
          },
          {
            icon: "sprite-news3",
            name: "周边商城",
            url: "https://pvp.qq.com/mall/m/?biz=yxzj#/"
          },
          {
            icon: "sprite-news4",
            name: "体验服",
            url: "https://pvp.qq.com/cp/a20161116tyf/page01.htm"
          },
          {
            icon: "sprite-news5",
            name: "新人专区",
            url: "https://pvp.qq.com/m/m201606/goCenter.shtml"
          },
          {
            icon: "sprite-news6",
            name: "荣耀 传承",
            url: "https://pvp.qq.com/m/memory/index.shtml"
          },
          {
            icon: "sprite-news7",
            name: "王者营地",
            url:
              "https://image.ttwz.qq.com/wzry/wzryzs_download_4001.htm?ADTAG=mpvp.qq.com"
          },
          {
            icon: "sprite-news8",
            name: "公众号",
            url:
              "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90102708&appid=wx95a3a4d7c627e07d&url=https%3A%2F%2Fgame.weixin.qq.com%2Fcgi-bin%2Fh5%2Fstatic%2Fsubscribe%2Findex.html%3Fappid%3Dwx95a3a4d7c627e07d#wechat_redirect"
          },
          {
            icon: "sprite-news2",
            name: "版本介绍",
            url: "https://pvp.qq.com/cp/a20190320bbgxsmm/index.html"
          },
          {
            icon: "sprite-news4",
            name: "对局坏境",
            url: "https://pvp.qq.com/cp/a20190917station/index.html"
          },
          {
            icon: "sprite-news5",
            name: "IP工创计划",
            url: "http://pvp.qq.com/cp/a20210428ipgc/"
          },
          {
            icon: "sprite-news7",
            name: "创意互动营",
            url: "https://pvp.qq.com/m/hdy/p1/index.html"
          }
        ];
        return (this.itemIndex = false);
      }
      const four = this.navItem.slice(0, 4);
      this.navItem = four;
      this.itemIndex = true;
    }
  }
};
</script>
<style lang='scss'>
.nav-icons {
  position: relative;
  .nav-item {
    width: 25%;
    border-left: 1px solid #d4d9de;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
  .hone-nav {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>