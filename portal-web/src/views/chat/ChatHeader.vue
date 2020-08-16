<template>
    <div class="chat-header">
        <div class="btn"
            @click="$emit('clickButton', 'add')">
            <a-icon type="plus" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Icon } from 'ant-design-vue';
export default Vue.extend({
  components: {
    'a-icon': Icon
  },
  methods: {
    // add() {
    //     this.$emit
    // }
  }
});
</script>

<style lang="scss" scoped>
.chat-header {
  background: #66339933;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  .btn {
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    height: 26px;
    width: 26px;
    padding: 5px;
    background: #663399;
    // buttonize
    transition: all 0.3s;
    &:hover {
      transform: scale(1.05);
      background: lighten($color: #663399, $amount: 10%);
    }
    &:active {
      transform: scale(0.95);
      background: darken($color: #663399, $amount: 10%);
    }
  }
}
</style>
