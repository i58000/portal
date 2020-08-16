<template>
  <div id="app">
    <Layout />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Layout from "@/layout/index.vue";
import { check } from "@/api/account";
import { notification } from "ant-design-vue";

export default Vue.extend({
  components: {
    Layout
  },
  async created() {
    console.log("app", this);
    (window as any).app = this;

    try {
      await check();
    } catch (e) {}
    if (this.$store.account) {
      notification.success({
        message: this.$store.account.nickname,
        description: "欢迎回来~"
      });
    }
  }
});
</script>
<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>
<style lang="scss">
body {
  overflow: hidden;
}
</style>


