<template>
    <div class="home">
        <!-- <a-breadcrumb :style="{ margin: '16px 0' }">
                            <a-breadcrumb-item>Home</a-breadcrumb-item>
                            <a-breadcrumb-item>List</a-breadcrumb-item>
                            <a-breadcrumb-item>App</a-breadcrumb-item>
                        </a-breadcrumb> -->
        <div>
            Content
            <button @click="collapsedSider = !collapsedSider">collapsedSider</button>
            <br />
            Really
            <br />...<br />...<br />...<br />
            long
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />...
            <br />...<br />...<br />...<br />...<br />...<br />
            content
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import Login from '@/components/Login.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'home',
  components: {
    // Login
  }
});
</script>
