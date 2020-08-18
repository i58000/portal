<template>
    <a-menu class="menu"
        theme="light"
        mode="horizontal"
        :selectedKeys="keys"
        :style="{ lineHeight: '64px' }">

        <!-- 叶节点用a-menu-item，非叶节点用a-sub-menu -->
        <component v-for="item in menus"
            :key="item.path"
            :is="item.children ? 'a-sub-menu' :'a-menu-item'">

            <!-- 叶节点 -->
            <template v-if="!item.children && item.meta && item.meta.label">
                <a v-if="item.meta.href"
                    :href="item.meta.href"
                    target="_blank">{{item.meta.label}}</a>
                <router-link v-else
                    :to="item.path">{{item.meta.label}}</router-link>
            </template>

            <!-- 非叶节点 -->
            <template v-if="item.children">
                <span slot="title">{{item.meta.label}} </span>
                <!-- 到此为止 -->
                <a-menu-item v-for="subItem in item.children"
                    :key="subItem.path">
                    <a v-if="subItem.meta && subItem.meta.href"
                        :href="subItem.meta.href"
                        target="_blank">{{subItem.meta.label}}</a>
                    <router-link v-else
                        :to="item.path + '/' + subItem.path">{{subItem.meta.label}}</router-link>
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
  data() {
    return {
      menus: []
    };
  },
  computed: {
    currentPath(): string {
      const splits = this.$route.path.split('/');
      return '/' + splits[1];
    },
    keys(): any {
      return [this.currentPath];
    }
  },
  created() {
    const routes = Object.assign([], this.$router.options.routes);
    const filter = (items: Array<any>) => {
      let deleteMe = true;
      for (let i = 0; i < items.length; i++) {
        if (items[i].meta && items[i].meta.label) {
          deleteMe = false;
          if (items[i].children) {
            const deleteChildren = filter(items[i].children);
            if (deleteChildren) delete items[i].children;
          }
        } else {
          items.splice(i, 1);
          i--;
        }
      }
      return deleteMe;
    };
    filter(routes);
    console.log('routes', routes);
    this.menus = routes;
  }
});
</script>
<style lang="scss" scoped>
.menu {
  border-bottom: 0px;
}
</style>
