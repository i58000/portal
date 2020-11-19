<template>
    <div class="home">
        <div class="wave">
        </div>
        <div class="container">
            <div class="title">
                &nbsp; Hello World
            </div>
            <div class="progress">
                慢慢砌砖，本站完成度：
                <a-progress :stroke-color="{ from: '#663399', to: '#87d068' }"
                    :percent="43.23"
                    status="active" />
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Progress } from 'ant-design-vue';
export default Vue.extend({
  components: {
    'a-progress': Progress
  },
  data() {
    return {
      footerDom: null as any
    };
  },
  mounted() {
    this.footerDom = document.querySelector('.footer');
    if (this.footerDom) {
      this.footerDom.style.background = '#663399';
      this.footerDom.style.color = 'white';
    }
  },
  beforeDestroy() {
    if (this.footerDom) {
      this.footerDom.style.background = 'unset';
      this.footerDom.style.color = 'unset';
    }
  }
});
</script>



<style lang="scss"scoped>
.home {
}
.container {
  height: calc(100vh - 112px);
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  position: relative;
  left: 10%;
  .title {
    margin-bottom: 40px;
    color: $primary-color;
    font-size: 50px;
    font-weight: bold;
  }
  .progress {
    text-align: center;
    color: $text-color-secondary;
    width: 300px;
  }
}
.wave {
  top: 0;
  left: 0;
  position: absolute;
  z-index: 0;
  align-items: center;
  min-height: calc(100vh - 40px);
  width: 100%;
  background-color: $primary-color; //rgb(118, 218, 255);
  overflow: hidden;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    min-width: 300vw;
    min-height: 300vw;
    background-color: #fff;
    animation-name: rotate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  &:before {
    bottom: 15vh;
    border-radius: 47%;
    animation-duration: 10s;
  }

  &:after {
    bottom: 12vh;
    opacity: 0.5;
    border-radius: 50%;
    animation-duration: 10s;
  }
}

@keyframes rotate {
  0% {
    transform: translate(-50%, 0) rotateZ(0deg);
  }
  50% {
    transform: translate(-50%, 0%) rotateZ(180deg);
  }
  100% {
    transform: translate(-50%, 0) rotateZ(360deg);
  }
}

h2 {
  position: relative;
  color: #333;
  z-index: 10;
  text-align: center;
  height: 100vh;
  line-height: 140vh;
  font-size: 8vw;
  text-shadow: 3px 3px 2px #999;
}
</style>