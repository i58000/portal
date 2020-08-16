<template>
  <a-form class="form" :layout="layoutType" :form="form" @submit="handleSubmit">
    <a-form-item class="form-item" :has-feedback="!isLogin">
      <a-input
        v-decorator="[
            'username',
            { 
                rules: [
                    { required: true, message: '请输入 用户名' },
                    { validator: validateUsername }
                ]
            },
        ]"
        placeholder="用户名"
      >
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item class="form-item" :has-feedback="!isLogin">
      <a-input
        v-decorator="[
        'password',
            { 
                rules: [
                    { required: true, message: '请输入 密码' },
                    { validator: validateToNextPassword }
                ] 
            },
        ]"
        type="password"
        placeholder="密码"
      >
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <transition name="collapse">
      <div v-if="!isLogin">
        <a-form-item class="form-item" has-feedback>
          <a-input
            v-decorator="[
                'confirm',
                {
                    rules: [
                        {
                            required: true,
                            message: '请确认两次输入的 密码 一致',
                        },
                        {
                            validator: compareToFirstPassword,
                        },
                    ],
                },
            ]"
            type="password"
            @blur="handleConfirmBlur"
            placeholder="确认密码"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item class="form-item">
          <a-input
            v-decorator="[
              'email',
              { 
                rules: [
                  { type: 'email', message: 'E-mail 邮箱格式不正确' }
                ] 
              },
            ]"
            placeholder="E-Mail"
          >
            <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
      </div>
    </transition>
    <a-form-item class="form-item">
      <a-alert v-if="isAlert" message="服务器被外星人入侵" banner closable />
    </a-form-item>

    <a-form-item class="form-item">
      <a-row>
        <a-col :span="14">
          <a-button
            class="btn"
            type="primary"
            html-type="submit"
            :loading="isLoading"
            :disabled="hasErrors(form.getFieldsError())"
          >{{ isLoading ? '' : (isLogin ? '登录' : '注册') }}</a-button>
        </a-col>
        <a-col :span="10">
          <a-button class="btn switch" @click="onclickSwitch">{{ isLogin ? '去注册' : '去登陆'}}</a-button>
        </a-col>
      </a-row>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import Vue from "vue";
import { Alert, Form, Input, Icon, Button, message } from "ant-design-vue";

export default Vue.extend({
  components: {
    AAlert: Alert,
    "a-form": Form,
    "a-form-item": Form.Item,
    "a-input": Input,
    "a-icon": Icon,
    "a-button": Button
  },
  props: {
    layoutType: {
      type: String,
      default(): "horizontal" | "vertical" | "inline" {
        return "horizontal";
      }
    },
    isLogin: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      hasErrors: function(fieldsError: any) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
      },
      form: (Form as any).createForm(this, { name: "account_entry" }),
      confirmDirty: false,
      isLoading: false,
      isAlert: false
    };
  },
  watch: {
    isLogin() {
      if (this.form.getFieldValue("username")) {
        this.form.validateFields(["username"], { force: true });
      }
      if (this.form.getFieldValue("password")) {
        this.form.validateFields(["password"], { force: true });
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      //   this.form.validateFields();
    });
  },
  methods: {
    handleSubmit(e: any) {
      e.preventDefault();
      this.isLoading = true;
      if (this.isLogin) {
        this.login();
      } else {
        this.register();
      }
    },
    login() {
      this.form.validateFields(async (err: any, inputs: any) => {
        if (!err) {
          const cb = ({ errCode, errMsg, nickname }: any) => {
            this.isLoading = false;
            switch (errCode) {
              case undefined:
                message.success(`欢迎回来，${nickname}`);
                break;
              case 3005:
                this.form.setFields({
                  username: {
                    value: this.form.getFieldValue("username"),
                    errors: [new Error("密码错误或用户不存在")]
                  }
                });
                break;
              default:
                this.isAlert = true;
            }
          };
          this.$emit("login", { inputs, cb });
        } else {
          this.isLoading = false;
        }
      });
    },
    register() {
      this.form.validateFields(async (err: any, inputs: any) => {
        if (!err) {
          const cb = ({ errCode, errMsg, nickname }: any) => {
            this.isLoading = false;
            switch (errCode) {
              case undefined:
                message.success(`注册成功，已为您自动登录，${nickname}`);
                break;
              case 3004:
                this.form.setFields({
                  username: {
                    value: this.form.getFieldValue("username"),
                    errors: [new Error("用户已存在")]
                  }
                });
                break;
              default:
                this.isAlert = true;
            }
          };
          this.$emit("register", { inputs, cb });
        } else {
          this.isLoading = false;
        }
      });
    },
    onclickSwitch() {
      this.$emit("switch", !this.isLogin);
    },
    handleConfirmBlur(e: any) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    validateUsername(rule: any, value: string, callback: any) {
      if (this.isLogin) {
        callback();
        return;
      }
      if (value.length < 4) {
        callback("用户名 至少为4位");
      }
      callback();
    },
    compareToFirstPassword(rule: any, value: string, callback: any) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次输入的 密码 不一致");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule: any, value: string, callback: any) {
      if (this.isLogin) {
        callback();
        return;
      }
      if (value.length < 6) {
        callback("密码 最少为6位");
      } else if (value && this.confirmDirty) {
        const form = this.form;
        form.validateFields(["confirm"], { force: true });
        callback();
      } else {
        callback();
      }
    }
  }
});
</script>


<style lang="scss" scoped>
.form {
  .form-item {
    margin-bottom: 10px;
    // &:last-child {
    //   margin-bottom: 0px;
    // }
  }
}
.btn {
  width: 100%;
  &.switch {
    margin-left: 10px;
    width: calc(100% - 10px);
  }
}

.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
  height: 100px;
}
.collapse-enter,
.collapse-leave-to {
  opacity: 0;
  height: 0px;
}
</style>

