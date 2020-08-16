<template>
  <div class="chat-group-dialog">
    <div class="top">
      <div
        class="history"
        :style="styleObj"
        ref="history"
        @mousedown="onmousedown"
        @mouseup="onmouseup"
        @scroll="onscroll"
      >
        <div class="line">
          <div
            class="load-more"
            :class="{ 'has-more-message': !noMoreMessage }"
            @click="noMoreMessage || loadMore()"
          >{{noMoreMessage ? '到顶了' : '点击加载历史消息' }}</div>
        </div>
        <div
          class="line"
          v-for="item in historySorted"
          :key="item.id"
          :class="{bymyself: item.by === account.id}"
        >
          <Bubble
            :bymyself="item.by === account.id"
            :content="item.content"
            :nickname="item.nickname"
            :at="item.at"
            :visibleTime="visibleTime"
          />
        </div>
      </div>
      <transition name="emerge">
        <div
          class="has-new-message"
          v-if="hasNewMessage"
          @click="scrollTo(); hasNewMessage = false"
        >新消息</div>
      </transition>
    </div>
    <div class="bottom" :class="{ pending: isPending }">
      <div class="left">
        <textarea
          class="input"
          v-model="input"
          type="textarea"
          :disabled="isPending"
          @keydown.enter.prevent
          @keyup.enter="send"
        />
      </div>
      <div class="right">
        <button
          class="btn send"
          :class="{ pending: isPending }"
          :disabled="isPending"
          @click="send"
        >
          <span v-if="isPending">
            <a-icon type="loading" />
          </span>
          <span v-else>Send</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Icon } from "ant-design-vue";
import Bubble from "./Bubble.vue";
import Account from "@/models/Account";

function createComputed(key: string) {
  return {
    get(): any {
      return (this as any).group[key];
    },
    set(val: any) {
      (this as any).$set((this as any).group, key, val);
    }
  };
}

export default Vue.extend({
  components: {
    "a-icon": Icon,
    Bubble
  },
  props: {
    group: {
      type: Object
    }
  },
  data() {
    return {
      visibleTime: false,
      skipWatchHistroyLength: false,
      styleObj: {
        "scroll-behavior": "smooth"
      }
    };
  },
  computed: {
    noMoreMessage: createComputed("_noMoreMessage"),
    isPending: createComputed("_isPending"),
    input: createComputed("_input"),
    disableAutoScroll: createComputed("_disableAutoScroll"),
    hasNewMessage: createComputed("_hasNewMessage"),
    account(): Account | null {
      return this.$store.account;
    },
    history(): any {
      return this.group?.history || [];
    },
    historySorted(): any {
      // const arr = this.history.concat([]);
      const arr = this.history;
      return arr.sort((a: any, b: any) => {
        return a.at - b.at;
      });
    }
  },
  watch: {
    "group.id": {
      async handler() {
        this.skipWatchHistroyLength = true;
        const dom: any = this.$refs.history;
        if (this.disableAutoScroll) {
          // 记录位置
          this.scrollTo(this.group._scrollTop, false);
        } else {
          // 底部
          this.scrollTo(undefined, false);
        }
      }
    },
    "history.length": {
      async handler() {
        if (this.skipWatchHistroyLength) {
          this.skipWatchHistroyLength = false;
          return;
        }
        if (this.disableAutoScroll) {
          this.hasNewMessage = true;
          return;
        }
        this.scrollTo();
      }
    }
  },
  mounted() {
    this.scrollTo();
  },
  methods: {
    async send() {
      if (this.input === "") return;
      const currrentGroup = this.group;
      this.$set(currrentGroup, "_disableAutoScroll", false);
      this.$set(currrentGroup, "_isPending", true);
      const callback = (res: boolean) => {
        if (res) this.$set(currrentGroup, "_input", "");
        this.$set(currrentGroup, "_isPending", false);
      };
      this.$emit("send", {
        content: this.input,
        groupId: this.group.id,
        callback
      });
    },

    loadMore() {
      this.$emit("loadMore", {
        groupId: this.group.id,
        beforeTimestamp: this.historySorted[0]?.at.getTime()
      });
    },
    scrollToBottom() {
      (this.$refs.history as any).scrollTop = (this.$refs
        .history as any).scrollHeight;
    },
    onscroll() {
      const dom: any = this.$refs.history;
      this.disableAutoScroll =
        dom.scrollHeight - dom.scrollTop - dom.clientHeight > 20;

      this.group._scrollTop = dom.scrollTop;

      if (!this.disableAutoScroll) this.hasNewMessage = false;
    },
    onmousedown() {
      this.visibleTime = true;
    },
    onmouseup() {
      this.visibleTime = false;
    },
    async scrollTo(where: number = Infinity, isSmooth: boolean = true) {
      const dom: any = this.$refs.history;
      // to bottom
      if (where === Infinity) {
        await this.$nextTick();
        where = dom.scrollHeight;
      }
      // to where
      if (!isSmooth) this.styleObj["scroll-behavior"] = "unset";
      await this.$nextTick();
      dom.scrollTop = where;
      this.styleObj["scroll-behavior"] = "smooth";
    }
  }
});
</script>


<style lang="scss" scoped>
.chat-group-dialog {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .top {
    height: calc(100% - 100px);
    position: relative;
    .history {
      /* 滚动槽 */
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      &::-webkit-scrollbar-track {
        border-radius: 3px;
        background: rgba(0, 0, 0, 0.06);
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
      }
      /* 滚动条滑块 */
      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: rgba(0, 0, 0, 0.12);
        -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
      }
      padding: 20px 10px 0px 10px;
      // scroll-behavior: smooth;
      height: 100%;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      .line {
        height: fit-content;
        width: 100%;
        margin: 4px 0;
        &.bymyself {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
        }
        &:last-child {
          margin-bottom: 20px;
        }
        .load-more {
          &.has-more-message {
            cursor: pointer;
          }
          color: $text-color-secondary;
          text-align: center;
          font-size: $font-size-secondary;
        }
      }
    }
    .has-new-message {
      &::before {
        content: "";
        background: $warning-color;
        width: 10px;
        height: 10px;
        top: 24px;
        position: absolute;
        left: calc(50% - 6px);
        transform: rotate(45deg);
      }
      width: fit-content;
      left: 0;
      right: 0;
      margin: auto;
      text-align: center;
      color: #fff;
      background: $warning-color;
      bottom: 10px;
      position: absolute;
      padding: 4px 8px 5px 8px;
      border-radius: 20px;
      // border-bottom-right-radius: 4px;
      transition: all 0.3s;
      cursor: pointer;
      box-shadow: 0 0 10px #0000001f;
      &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 15px #0000001f;
      }
    }
  }
  .bottom {
    background: #f0f0f0;
    width: 100%;
    min-height: 100px;
    display: flex;
    &.pending {
      background: #66339911;
    }
    .left {
      width: 100%;
      height: 100%;
      textarea {
        background: transparent;
        padding: 16px;
        resize: none;
        height: 100%;
        width: 100%;
        border: 0;
        outline: 0;
      }
    }
    .right {
      padding: 8px;
      min-width: 60px;
      max-width: 100px;
      width: 20%;
      button {
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s;
        color: #fff;
        background: #663399;
        border: 0;
        outline: 0;
        height: 100%;
        width: 100%;

        &:hover {
          transform: scale(1.04);
          background: lighten($color: #663399, $amount: 10%);
        }
        &:active,
        &.pending {
          transform: scale(0.96);
          background: darken($color: #663399, $amount: 10%);
        }
      }
    }
  }
}
</style>
