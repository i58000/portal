<template>
    <div class="home-sider">
        <template v-if="visibleSearcher">
            <Operator />
            <br>
            <Searcher />
        </template>

        <MyProfile v-else />

    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Skeleton } from 'ant-design-vue';
import MyProfile from '@/components/MyProfile.vue';
import Searcher from './Searcher.vue';
import Operator from './Operator.vue';

export default Vue.extend({
  components: {
    'a-skeleton': Skeleton,
    MyProfile,
    Searcher,
    Operator
  },
  computed: {
    visibleSearcher(): boolean {
      return this.$route.name === 'blogList';
    }
  },
  methods: {}
});
</script>
<style lang="scss" scoped>
.home-sider {
  display: flex;
  flex-direction: column;
  padding: 40px;

  .part3 {
    margin-top: 50px;
  }
}
</style>
