<template>
  <a-dropdown :visible="isClicked || visibleHover">
    <div class="header-account">
      <div v-if="$store.account" class="account login">
        <div>
          <a-avatar
            icon="user"
            @mouseenter.native="isHover = true"
            @mouseleave.native="isHover = false"
          />
        </div>
        <div class="title">{{$store.account.nickname}}</div>
      </div>
      <div v-else class="account no-login">
        <a-button class="btn" type="link" @click.stop="isClicked = true; isLogin = true">登录</a-button>
        <a-divider class="divider" type="vertical" />
        <a-button class="btn" type="link" @click.stop="isClicked = true; isLogin = false">注册</a-button>
      </div>
    </div>

    <div
      slot="overlay"
      @click="isClicked = true"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
      v-click-outside="onclickoutside"
    >
      <div class="panel-login">
        <AccountProfile
          v-if="$store.account"
          :nickname="$store.account.nickname"
          :username="$store.account.username"
          :id="$store.account.id"
        />
        <AccountEntry
          v-else
          :isLogin="isLogin"
          @switch="isLogin = $event"
          @login="onLogin"
          @register="onRegister"
        />
      </div>
    </div>
  </a-dropdown>
</template>
<script lang="ts">
import Vue from "vue";
import ClickOutside from "vue-click-outside";
import { Avatar, Dropdown, Button, Divider } from "ant-design-vue";
import AccountEntry from "@/components/AccountEntry.vue";
import AccountProfile from "@/components/AccountProfile.vue";
import { login, register } from "@/api/account";

export default Vue.extend({
  components: {
    "a-avatar": Avatar,
    "a-dropdown": Dropdown,
    "a-button": Button,
    "a-divider": Divider,
    AccountEntry,
    AccountProfile
  },
  directives: {
    ClickOutside
  },
  data() {
    return {
      isLogin: true,
      visibleHover: false,
      isHover: false,
      isClicked: false,
      timer: 0
    };
  },
  watch: {
    isHover(val) {
      this.clearTimer();
      if (val) {
        this.visibleHover = true;
      } else {
        this.timer = setTimeout(() => {
          this.visibleHover = false;
          this.timer = 0;
        }, 2000);
      }
    }
  },
  methods: {
    test(e: any) {
      console.log(e);
      e.preventDefault();
    },
    onclickoutside() {
      this.isClicked = false;
      this.visibleHover = false;
      this.clearTimer();
    },
    clearTimer() {
      if (this.timer !== 0) {
        clearTimeout(this.timer);
        this.timer = 0;
      }
    },
    async onLogin({ inputs, cb }: any) {
      try {
        const { username, password } = inputs;
        const data = await login(username, password);
        cb(data);
      } catch (e) {
        cb(e.response.data);
      }
    },
    async onRegister({ inputs, cb }: any) {
      try {
        const { username, password, confirm, email } = inputs;
        const data = await register(username, password, confirm, email);
        cb(data);
      } catch (e) {
        cb(e.response.data);
      }
    }
  }
});
</script>
<style lang="scss" scoped>
.header-account {
  // height: 100%;
  align-items: center;
  display: flex;
  .account {
    display: flex;
    justify-content: center;
    &.login {
      .title {
        margin-left: 20px;
      }
    }
    &.no-login {
      display: flex;
      align-items: center;

      // height: 100%;
      .btn {
        color: #bdbdbd;
      }
      .divider {
        height: 26px;
      }
    }
  }
}
.panel-login {
  margin-top: 10px;
  width: 300px;
  background: #fff;
  padding: 20px 30px;
  border-color: rgba(0, 0, 0, 0.09);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
}
</style>
