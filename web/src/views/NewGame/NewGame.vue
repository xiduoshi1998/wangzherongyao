<template>
  <div v-if="newGame.length">
    <div class="bg-white">
      <a :href="newGame[0].url">
        <img :src="newGame[0].image" alt class="w-100 px-4 py-2" />
        <div class="p-2 fs-xs text-black">代号:破晓</div>
      </a>
    </div>
    <div class="bg-white mt-2">
      <a :href="newGame[1].url">
        <img :src="newGame[1].image" alt class="w-100 px-4 py-3" />
        <div class="p-2 fs-xs text-black">代号:启程</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newGame: []
    };
  },
  methods: {
    async fetchGame() {
      const res = await this.$http.get("newgame");
      console.log(res.data.items);
      this.newGame = res.data.items;
    }
  },
  created() {
    this.fetchGame();
  }
};
</script>
<style scoped>
</style>