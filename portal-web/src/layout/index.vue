<template>
    <a-layout class="layout">
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <Header />

        </a-layout-header>
        <a-layout :style="{ marginTop: '64px' }">
            <a-layout-content :style="{ height: '100%' }">
                <a-layout :style="{ minHeight: 'calc(100% - 48px)' }">
                    <a-layout-content>
                        <router-view></router-view>
                    </a-layout-content>

                </a-layout>
                <a-layout-footer :style="{ height: '48px', padding: '0' }">
                    <Footer />
                </a-layout-footer>
            </a-layout-content>
            <a-layout-sider class="sider"
                theme="light"
                collapsedWidth="0"
                v-model="collapsedSider">
                collapsedSider
            </a-layout-sider>
        </a-layout>
    </a-layout>
</template>
<script lang="ts">
import Vue from 'vue';
import { Layout } from 'ant-design-vue';
import Header from './Header/index.vue';
import Footer from './Footer.vue';

export default Vue.extend({
  components: {
    'a-layout': Layout,
    'a-layout-header': Layout.Header,
    'a-layout-content': Layout.Content,
    'a-layout-sider': Layout.Sider,
    'a-layout-footer': Layout.Footer,
    Header,
    Footer
  },
  data() {
    return {
      collapsedSider: true
    };
  }
});
</script>

<style lang="scss" scoped>
.ant-layout,
.ant-layout-header {
  background: unset;
  padding: 0;
}

.layout {
  height: 100%;
}
</style>
