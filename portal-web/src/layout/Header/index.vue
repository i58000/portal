<template>
    <div class="header">
        <HeaderLogo class="left" />
        <HeaderMenu />
        <HeaderAccount class="right" />
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import HeaderAccount from './HeaderAccount.vue';
import HeaderMenu from './HeaderMenu.vue';
import HeaderLogo from './HeaderLogo.vue';

export default Vue.extend({
  components: {
    HeaderAccount,
    HeaderMenu,
    HeaderLogo
  }
});
</script>
<style lang="scss" scoped>
.header {
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;
  .right {
    margin-right: 40px;
  }
  .left {
    margin-left: 40px;
  }
}
</style>
