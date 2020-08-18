<template>
    <div class="home-sider">
        <MyProfile />

        <!-- <div class="part3">
            <a-skeleton avatar1
                active
                :paragraph="{ rows: 4 }" />
            <a-skeleton avatar1
                active
                :paragraph="{ rows: 8 }" />
            <a-skeleton avatar
                active
                :paragraph="{ rows: 3 }" />

        </div> -->

    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Skeleton } from 'ant-design-vue';
import MyProfile from '@/components/MyProfile.vue';
export default Vue.extend({
  components: {
    'a-skeleton': Skeleton,
    MyProfile
  }
});
</script>
<style lang="scss" scoped>
.home-sider {
  display: flex;
  flex-direction: column;
  padding: 20px;

  .part3 {
    margin-top: 50px;
  }
}
</style>
