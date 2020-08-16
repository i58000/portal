<template>
  <div class="chat-group-list">
    <div
      class="chat-group-item"
      :class="{active: item.id === value}"
      v-for="item in groupsSorted"
      :key="item.id"
      @click="onclick(item)"
    >
      <div class="text">[{{ item.accounts.length }}] - {{ getTitle(item) }}</div>
      <transition name="pop">
        <div class="unread" v-if="item._unread">{{ item._unread | filterUnread }}</div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    value: { type: Number },
    groups: {
      type: Array
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  computed: {
    groupsSorted() {
      // const arr = (this.groups as any).concat([]);
      const arr: any = this.groups;
      arr.sort((a: any, b: any) => {
        const aa = a._unread || 0;
        const bb = b._unread || 0;
        if ((aa > 0 && bb > 0) || (aa == 0 && bb == 0)) {
          const aaa = a.history ? a.history[a.history.length - 1].at : 0;
          const bbb = b.history ? b.history[b.history.length - 1].at : 0;
          return bbb - aaa;
        }
        if (aa > 0) {
          return -1;
        } else {
          // bb > 0
          return 1;
        }
      });
      return arr;
    }
  },
  filters: {
    filterUnread(value: any) {
      return value ? (value > 99 ? "99+" : value) : "";
    }
  },
  methods: {
    getTitle(item: any) {
      const accounts = item.accounts;
      const accountId = this.$store.account?.id;
      if (accounts.length === 2) {
        return accounts.find((x: any) => x.id !== accountId).nickname;
      } else {
        return item.title;
      }
    },
    onclick(item: any) {
      this.$emit("change", item.id);
      this.$set(item, "_unread", 0);
    }
  }
});
</script>
<style lang="scss" scoped>
.chat-group-list {
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
  overflow-y: auto;
  height: 100%;
  padding: 5px;
  background: #66339933;
  .chat-group-item {
    transition: all 0.3s;
    height: 48px;
    line-height: 48px;
    padding: 0 14px;
    margin: 10px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      color: #fff;
      background: #66339922;
      transform: scale(1.02);
    }
    &:active {
      transform: scale(0.98);
      background: darken($color: #663399, $amount: 5%);
    }
    &.active {
      color: #fff;
      background: #663399;
      &:hover {
        background: lighten($color: #663399, $amount: 5%);
      }
      &:active {
        background: darken($color: #663399, $amount: 5%);
      }
    }
    display: flex;
    align-items: center;
    .text {
      width: 100%;
      text-overflow: ellipsis;
      flex-grow: 0;
      height: 100%;
      white-space: nowrap;
      overflow: hidden;
    }
    .unread {
      font-size: 10px;
      background: $error-color;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 20px;
      min-width: 20px;
      border-radius: 20px;
      color: #fff;
      margin-left: 10px;
      width: fit-content;
      padding: 0 8px;
    }
  }
}
</style>
