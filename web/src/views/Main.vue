<template>
  <div>
    <div class="topbar bg-black py-1 px-3 d-flex ai-center">
      <img src="@/assets/image/logo.jpg" height="30" />
      <div class="px-3 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-dark-1 fs-xs">团队成就更多</div>
      </div>
      <button href class="btn bg-primary">立即下载</button>
    </div>

    <div class="bg-primary py-2">
      <div class="nav nav-inverse pb-1 px-4 jc-between">
        <div class="nav-item" :class="{active:$route.path==='/'}">
          <router-link to="/" custom v-slot="{ navigate }">
            <div @click="navigate">首页</div>
          </router-link>
        </div>
        <div class="nav-item" :class="{active:$route.path=='/strategy'}">
          <router-link to="/strategy" custom v-slot="{ navigate }">
            <div @click="navigate">攻略中心</div>
          </router-link>
        </div>
        <div class="nav-item">
          <router-link custom v-slot="{ navigate }" to="/a">
            <div @click="navigate">赛事中心</div>
          </router-link>
        </div>
        <div class="nav-item">
          <router-link to="/newgame" custom v-slot="{ navigate }">
            <div @click="navigate" role="link">IP新游</div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- main下的子路由 -->
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: ""
    };
  }
};
</script>
<style lang='scss'>
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
}
// .router-link-active {
//   color: #fff;
//   border-bottom: 3px solid #fff;
// }
</style>