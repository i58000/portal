<template>
    <div class="about">
        <MyProfile class="profile" />
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import MyProfile from '@/components/MyProfile.vue';
export default Vue.extend({
  components: {
    MyProfile
  }
});
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 120px);
  .profile {
    max-width: 600px;
    min-height: 400px;
  }
}
</style>
