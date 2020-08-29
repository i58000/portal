<template>
  <div v-contextmenu:append.menu="setData" class="NodeContextMenu">
    <div class="pane">
      <template v-if="node">
        <div
          v-for="(item, index) in appendable"
          :key="index"
          class="item"
          :class="item.value"
          @click="node.append(item); $emit('rerender')"
          v-text="`添加${item.label}`"
        ></div>
        <div class="item remove" @click="node.remove(); $emit('rerender')">删除</div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  //   props: {
  //     node: {}
  //   },
  computed: {
    appendable() {
      return this.node.appendable();
    }
  },
  data() {
    return {
      node: null
    };
  },
  methods: {
    setData(data) {
      // debugger;
      console.log(data);
      this.node = data;
    }
  }
};
</script>
<style lang="less" scoped>
.NodeContextMenu {
  .pane {
    box-shadow: @box-shadow-base;
    padding: 4px 0;
    background: #fff;
    box-shadow: 0 0 10 #0002;
    border: 1px solid @border-color-base;
    border-radius: @border-radius-base;
  }
  .item {
    min-width: 80px;
    color: @text-color;
    text-align: center;
    transition: all 0.3s;

    cursor: pointer;
    height: 24px;
    padding: 2px 10px 2px 10px;

    #mixin-button(@color) {
      &:hover {
        color: #fff;
        background: @color;
      }
      &:active {
        background: darken(@color, 10%);
      }
    }

    &.condition {
      #mixin-button(@warning-color);
    }
    &.variable {
      #mixin-button(@primary-color);
    }
    &.action {
      #mixin-button(@success-color);
    }

    &.remove {
      #mixin-button(@error-color);
    }
  }
}
</style>


