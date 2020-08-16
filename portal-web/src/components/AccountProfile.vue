<template>
    <div>
        <div class="text title">{{nickname}}</div>
        <a-divider />
        <div class="text gray">
            {{username}}
            <a-divider type="vertical" />
            {{id}}
        </div>
        <a-row class="btns">
            <a-col :span="6">
                <a-button class="btn settings">
                    <a-icon type="setting" />
                </a-button>
            </a-col>
            <a-col :span="18">
                <a-button class="btn"
                    type="danger"
                    @click="handleSubmit">退出登录</a-button>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Divider, Button, Icon, message } from 'ant-design-vue';
import { logout } from '@/api/account';

export default Vue.extend({
  components: {
    'a-divider': Divider,
    'a-button': Button,
    'a-icon': Icon
  },
  props: {
    username: String,
    nickname: String,
    id: Number
  },
  methods: {
    async handleSubmit() {
      const { nickname } = await logout();
      message.success(`${nickname} 已登出`);
    }
  }
});
</script>

<style lang="scss" scoped>
.ant-divider-horizontal {
  margin: 8px 0;
}
.ant-divider-vertical {
  margin: 0px 8px;
}
.text {
  &.title {
    font-size: 20px;
  }
  &.gray {
    color: #bdbdbd;
  }
}
.btn {
  width: 100%;
  &.settings {
    margin-right: 10px;
    width: calc(100% - 10px);
  }
}
.btns {
  margin-top: 20px;
}
</style>