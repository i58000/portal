<template>
  <div class="account-searcher">
    <a-input-search placeholder="搜索用户" enter-button @search="onSearch" :disabled="isSearching" />
    <a-list class="list" :loading="isSearching" item-layout="horizontal" :data-source="accountsFiltered">
      <div
        v-if="!noMore"
        slot="loadMore"
        :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
      >
        <a-spin v-if="isLoading" />
        <a-button v-else type="link" @click="onLoadMore">更多...</a-button>
      </div>
      <a-list-item
        @click="toggle(item)"
        slot="renderItem"
        class="item"
        :class="{ selected: item._selected }"
        slot-scope="item"
      >
        <a slot="actions">
          <transition name="pop">
            <a-icon
              type="message"
              style="font-size: 20px"
              v-if="!selected"
              @click.stop="createGroup([item])"
            />
          </transition>
        </a>

        <a-list-item-meta :description="item | filterDescription">
          <a slot="title">{{ item.nickname }}</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-list-item-meta>
        <!-- <div>content</div> -->
      </a-list-item>
    </a-list>

    <div class="bottom">
      <a-button
        type="primary"
        class="btn create-group"
        :loading="isCreateGroup"
        :disabled="!selected"
        @click="createGroup(accounts.filter(x => x._selected))"
      >创建聊天</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Input, Avatar, List, Button, Icon, Spin } from "ant-design-vue";
const PAGE_SIZE = 3;
export default Vue.extend({
  components: {
    "a-input-search": Input.Search,
    "a-avatar": Avatar,
    "a-list": List,
    "a-list-item": List.Item,
    "a-list-item-meta": List.Item.Meta,
    "a-button": Button,
    "a-icon": Icon,
    "a-spin": Spin
  },
  props: {
    accounts: {
      type: Array
    }
  },
  data() {
    return {
      isSearching: false,
      isLoading: false,
      noMore: true,
      isCreateGroup: false,
      keyword: "",
      index: 0
    };
  },
  computed: {
    accountsFiltered(): any {
      return this.accounts.filter((x: any) => x.id !== this.$store.account?.id);
    },
    selected(): boolean {
      return this.accounts.filter((x: any) => x._selected).length > 0;
    }
  },
  created() {
    this.onSearch("");
  },
  filters: {
    filterDescription(val: any) {
      return `${val.username} | ${val.id}`;
    }
  },
  methods: {
    toggle(account: any) {
      this.$set(account, "_selected", !account._selected);
    },
    onLoadMore() {
      this.isLoading = true;
      this.$emit("search", {
        keyword: this.keyword,
        pager: {
          size: PAGE_SIZE,
          index: ++this.index
        },
        callback: (success: boolean, noMore: boolean) => {
          this.isLoading = false;
          this.noMore = noMore;
        }
      });
    },
    onSearch(keyword: string) {
      this.keyword = keyword;
      this.isSearching = true;
      this.index = 0;
      this.$emit("search", {
        keyword,
        pager: {
          size: PAGE_SIZE,
          index: 0
        },
        callback: (success: boolean, noMore: boolean) => {
          this.isSearching = false;
          this.noMore = noMore;
        }
      });
    },
    createGroup(accounts: any) {
      this.isCreateGroup = true;
      this.$emit("createGroup", {
        accounts,
        callback: (success: boolean) => {
          this.isCreateGroup = false;
          this.accounts.forEach((x: any) => {
            this.$delete(x, "_selected");
          });
        }
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.account-searcher {
  .list {
    padding: 0 10px;
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
    max-height: 60vh;
    overflow-y: auto;
    margin: 20px 0;
    .item {
      cursor: pointer;
      border-radius: $border-radius-base;
      padding: 8px 10px;
      transition: all 0.3s;
      &.selected {
        background: #66339933;
      }
    }
  }
  .bottom {
    text-align: center;
  }
}
</style>
