<template>
  <div>
    <video :src="video.video" class="w-100" controls></video>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      video: {}
    };
  },
  methods: {
    async fetVideo() {
      const res = await this.$http.get(`video/${this.id}`);
      this.video = res.data;
    }
  },
  created() {
    this.fetVideo();
  }
};
</script>
<style scoped>
</style>