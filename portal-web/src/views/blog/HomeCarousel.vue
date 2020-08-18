<template>
  <a-carousel class="carousel" dot-position="left" autoplay>
    <div >
      <img src="@/assets/banner1.jpg" />
    </div>
    <div>
      <img src="@/assets/banner2.jpg" />
    </div>
    <div>
      <img src="@/assets/banner3.jpg" />
    </div>
  </a-carousel>
</template>
<script>
import Vue from "vue";
import { Carousel } from "ant-design-vue";
export default Vue.extend({
  components: {
    "a-carousel": Carousel
  },
  data() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  max-height: 100%;
}
/* For demo */
.ant-carousel ::v-deep .slick-slide {
  text-align: center;
  height: 200px;
  line-height: 200px;
  background: #66339933;
  overflow: hidden;
}
</style>
