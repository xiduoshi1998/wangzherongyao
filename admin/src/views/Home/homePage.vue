<template>
  <div>
    <div>Home Page</div>
    <div class="animate__animated animate__rubberBand">
      <img src="../../image/Gabriel.jpg" alt />
    </div>
    <div class="font2">sssssssssssss</div>
  </div>
</template>

<script>
import "animate.css";
export default {};
</script>
<style scoped>
@font-face {
  font-family: myFirstFont;
  src: url("../font/Blazed.ttf");
}
@font-face {
  font-family: myFirstFont2;
  src: url("../font/RAYGRG__.TTF");
}

.animate__animated {
  /* position: ; */
  text-align: center;
}
div {
  position: relative;
  top: -40px;
  text-align: center;
  font-family: "myFirstFont";
  margin-bottom: 0px;
  line-height: 60px;
  font-size: 40px;
  color: black;
}
img {
  width: 100%;
  padding: 0px !important;
}
.font2 {
  font-family: "myFirstFont2";
  font-size: 40px;
  color: black;
}
</style>