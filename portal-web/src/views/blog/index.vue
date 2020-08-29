<template>
    <div class="home">
        <!-- <CollapseTransition>
            <div class="top"
                v-show="$route.meta && $route.meta.visibleCarousel">
                <HomeCarousel />
            </div>
        </CollapseTransition> -->

        <div class="bottom">
            <div class="left">
                <router-view></router-view>
            </div>
            <div class="right">
                <HomeSider />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HomeCarousel from './HomeCarousel.vue';
import HomeSider from './HomeSider.vue';
import BlogList from './BlogList.vue';
import CollapseTransition from '@/components/collapse-transition';
export default Vue.extend({
  name: 'home',
  components: { HomeCarousel, HomeSider, BlogList, CollapseTransition },
  created() {
    window.aaa = this;
  }
});
</script>

<style lang="scss" scoped>
.home {
  padding-top: 40px;
  padding-bottom: 80px;
  padding-left: 10%;
  padding-right: 10%;

  .top {
    padding-bottom: 40px;
  }
  .bottom {
    display: flex;
    .left {
      width: 70%;
    }
    .right {
      width: 30%;
    }
    @media screen and (max-width: 1400px) {
      .left {
        width: 100%;
      }
      .right {
        display: none;
      }
    }
  }
}
@media screen and (max-width: 1400px) {
  .home {
    padding-left: 6%;
    padding-right: 6%;
  }
}
</style>
