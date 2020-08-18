<template>

    <a-breadcrumb>
        <!-- <a-breadcrumb-item>Home</a-breadcrumb-item> -->
        <a-breadcrumb-item>
            <router-link to="/blog">博客</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>{{current}}</a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script lang="ts">
import Vue from 'vue';
import { Breadcrumb } from 'ant-design-vue';

export default Vue.extend({
  props: {
    current: {}
  },
  components: {
    'a-breadcrumb': Breadcrumb,
    'a-breadcrumb-item': Breadcrumb.Item
  }
});
</script>


<style>
</style>


a-breadcrumb