<template>
    <a-menu class="menu"
        theme="light"
        mode="horizontal"
        :selectedKeys="keys"
        :style="{ lineHeight: '64px' }">

        <!-- 叶节点用a-menu-item，非叶节点用a-sub-menu -->
        <component v-for="item in $router.options.routes"
            :key="item.path"
            :is="item.children ? 'a-sub-menu' :'a-menu-item'">

            <!-- 叶节点 -->
            <template v-if="!item.children && item.meta && item.meta.label">
                <router-link :to="item.path">{{item.meta.label}}</router-link>
            </template>

            <!-- 非叶节点 -->
            <template v-if="item.children">
                <span slot="title">{{item.meta.label}} </span>
                <!-- 到此为止 -->
                <a-menu-item v-for="subItem in item.children"
                    :key="subItem.path">
                    <router-link :to="item.path+'/'+subItem.path">{{subItem.meta.label}}</router-link>
                </a-menu-item>
            </template>

        </component>
    </a-menu>
</template>
<script lang="ts">
import Vue from 'vue';
import { Menu } from 'ant-design-vue';

export default Vue.extend({
  components: {
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-sub-menu': Menu.SubMenu
  },
  computed: {
    keys(): any {
      return [this.$route.path];
    }
  }
});
</script>
<style lang="scss" scoped>
.menu {
  border-bottom: 0px;
}
</style>
