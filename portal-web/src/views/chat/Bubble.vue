<template>
    <div class="bubble"
        :class="{bymyself}">
        <!-- 右边 -->
        <div class="info"
            v-if="bymyself"> <span v-show="visibleTime"
                style="padding-right: 10px">{{time}}</span><span>{{nickname}}</span></div>

        <!-- 左边 -->
        <div class="info"
            v-else> <span>{{nickname}}</span>
            <span v-show="visibleTime"
                style="padding-left: 10px">{{time}}</span>
        </div>
        <div class="content">{{content}}</div>

    </div>
</template>

<script lang="ts">
import moment from 'moment';
import Vue from 'vue';
export default Vue.extend({
  props: {
    visibleTime: {
      default() {
        return true;
      }
    },
    id: Number,
    content: String,
    nickname: String,
    by: Number,
    at: Date,
    bymyself: Boolean
  },
  computed: {
    time(): string {
      return moment(this.at).format('MM-DD h:mm:ss a');
    },
    info(): string {
      if (this.bymyself) {
        return `${this.time} | ${this.nickname}`;
      } else {
        return `${this.nickname} | ${this.time}`;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.bubble {
  height: 100%;
  //   width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  float: left;

  &.bymyself {
    flex-direction: column-reverse;
    align-items: flex-end;
    .content {
      background: rebeccapurple;
      border-radius: 30px;
      border-bottom-right-radius: 4px;
      color: #fff;
      float: right;
      &:hover {
        transform: scale(1.05) translate(-4px, -4px);
      }
    }
    .info {
      text-align: right;
    }
  }
  .info {
    font-size: 8px;
    display: block;
    margin: 4px 0;
    color: #aaa;
  }
  .content {
    width: fit-content;
    background: #fff;
    padding: 8px 14px 12px 14px;
    border-radius: 30px;
    border-top-left-radius: 4px;
    color: rebeccapurple;
    box-shadow: 0 0 10px #0000000f;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.05) translate(4px, 4px);
      box-shadow: 0 0 15px #0000000f;
    }
  }
}
</style>