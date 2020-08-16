<template>
  <div class="chat">
    <div class="container" v-if="alive">
      <div class="left">
        <ChatHeader @clickButton="onclickButton"></ChatHeader>
        <ChatGroupList v-model="activeGroupId" :groups="groups" />
      </div>
      <div class="right">
        <ChatGroupDialog
          v-if="activeGroupId !== -1"
          :group="activeGroup"
          @send="send"
          @loadMore="loadMore"
        />
        <div v-else class="empty">请从左侧选择或创建一个聊天</div>
      </div>
    </div>
    <a-modal v-model="visibleAccountSearcher" centered :footer="null" :closable="false">
      <AccountSearcher :accounts="accounts" @createGroup="createGroup" @search="searchAccount" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ChatGroupList from "./ChatGroupList.vue";
import ChatGroupDialog from "./ChatGroupDialog.vue";
import ChatHeader from "./ChatHeader.vue";
import AccountSearcher from "./AccountSearcher.vue";
import {
  connect,
  disconnect,
  onmessage,
  sendMessage,
  readMessage,
  queryMessage
} from "@/api/ws";
import { queryGroup, createGroup } from "@/api/chat";
import { queryAccount } from "@/api/account";
import { NewMessagePayload } from "@/models/message";
import { Modal } from "ant-design-vue";
import Account from "@/models/Account";

export default Vue.extend({
  components: {
    ChatGroupList,
    ChatGroupDialog,
    ChatHeader,
    AccountSearcher,
    "a-modal": Modal
  },
  data() {
    return {
      activeGroupId: -1,
      groups: new Array<any>(),
      accounts: new Array<any>(),
      visibleAccountSearcher: false
    };
  },
  computed: {
    activeGroup(): any {
      return this.find(this.activeGroupId);
    },
    alive(): boolean {
      return Boolean(this.$store.account?.id);
    }
  },
  watch: {
    alive: {
      immediate: true,
      handler(val) {
        if (!val) return;
        this.init();
      }
    },
    // async "$store.account.id"() {
    //   debugger;
    //   this.alive = false;
    //   await this.$nextTick();
    //   this.alive = true;
    // },
    activeGroupId: {
      handler(val) {
        const group = this.find(val);
        if (group?.history === undefined) {
          queryMessage({
            groupId: val,
            count: 10
          });
        }
        readMessage({
          beforeTimestamp: new Date().getTime(),
          groupId: val
        });
      }
      // immediate: true
    }
  },
  created() {
    console.log(this);
    (window as any).chat = this;
  },
  beforeDestroy() {
    disconnect();
  },
  methods: {
    async init() {
      this.groups = await queryGroup();
      // set unread
      this.groups.forEach(g => {
        this.$set(g, "_unread", g.groupAccountRels[0].unread);
      });

      onmessage("NewMessage", this.onNewMessage);
      onmessage("System", this.onSystem);
      connect();
      // 查询未读
      // queryMessage({
      //   read: false
      // });
    },
    loadMore({ groupId, beforeTimestamp }: any) {
      queryMessage({
        groupId,
        beforeTimestamp,
        count: 10
      });
    },
    async send({ content, groupId, callback }: any) {
      try {
        const timestamp = new Date().getTime();
        const res = await sendMessage({ content, groupId, timestamp });
        callback(true);
      } catch (e) {
        console.error(e);
        callback(false);
      }
    },
    onSystem({ code, description, data }: any) {
      console.log(code, description, data);
      switch (code) {
        case 1001:
          const group = this.find(data.groupId);
          this.$set(group, "_noMoreMessage", true);
          break;
      }
    },
    onNewMessage({
      id,
      content,
      group,
      timestamp,
      account
    }: NewMessagePayload) {
      const { nickname, id: by } = account;
      let targetGroup = this.find(group.id);
      if (!targetGroup) {
        // targetGroup 不存在，更新targetGroup
        this.groups.unshift(group);
        targetGroup = group;
      }

      if (!targetGroup.history) {
        this.$set(targetGroup, "history", []);
      }

      // 去重
      if (targetGroup.history.find((x: any) => x.id === id)) {
        return;
      }

      // 标记已读当前的group
      if (targetGroup.id === this.activeGroupId) {
        readMessage({
          beforeTimestamp: new Date().getTime(),
          groupId: this.activeGroupId
        });
      }

      targetGroup.history.push({
        id,
        by,
        nickname,
        at: new Date(timestamp),
        content
      });
      if (targetGroup._disableAutoScroll) {
        this.$set(targetGroup, "_hasNewMessage", true);
      }
      if (targetGroup.id !== this.activeGroupId) {
        const count = targetGroup._unread || 0;
        this.$set(targetGroup, "_unread", count + 1);
      }
    },
    find(groupId: number): any {
      return this.groups.find((x: any) => x.id === groupId);
    },
    onclickButton(type: string) {
      switch (type) {
        case "add":
          this.visibleAccountSearcher = true;
          break;
      }
    },
    async createGroup({ accounts, callback }: any) {
      const newGroup = await createGroup(accounts);
      if (newGroup) {
        this.groups.unshift(newGroup);
        this.visibleAccountSearcher = false;
        this.activeGroupId = newGroup.id;
        callback(true);
      } else {
        callback(false);
        console.error("createGroup失败");
      }
    },
    async searchAccount({ keyword, pager, callback }: any) {
      const arr = await queryAccount({
        keyword,
        pager
      });
      if (pager.index === 0) {
        this.accounts = arr;
      } else {
        this.accounts.push(...arr);
      }
      callback && callback(true, arr.length < pager.size);
    }
  }
});
</script>


<style lang="scss" scoped>
.chat {
  background: #f9f9f9;
  height: calc(100vh - 112px);
  // padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    width: 80%;
    height: 80%;
    background: #fff;
    .left {
      height: 100%;
      width: 20%;
    }
    .right {
      height: 100%;
      width: 80%;
      .empty {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $font-size-secondary;
        color: $text-color-secondary;
      }
    }
  }
}
</style>
