<template>
  <div
    v-contextmenu:input.menu="setData"
    class="NodeContextMenu"
    @mouseleave="submenu = null"
  >
    <template v-if="options">
      <div class="menu pane">
        <div
          v-for="(item, index) in options"
          :key="index"
          :class="{hover: submenu && submenu === item.children}"
          class="item"
          @click="onClickMenu(item, $event)"
          @mouseenter="submenu = item.children"
        >
          <span v-text="item.label"></span>
          <span v-if="item.children" style="margin-left: 10px; float: right">></span>
        </div>
      </div>
      <div class="submenu pane" v-show="submenu">
        <div
          class="item"
          v-for="(item, index) in submenu"
          :key="index"
          @click="onClickSubmenu(item)"
          v-text="item.label"
        ></div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: null,
      update: null,
      submenu: null
    };
  },
  methods: {
    setData({ options, update }) {
      // debugger;
      this.options = options;
      this.update = update;
    },
    onClickMenu(item, event) {
      if (item.children) {
        event.stopPropagation();
      } else {
        this.doUpdate(item.value);
      }
    },
    onClickSubmenu(item) {
      this.doUpdate(item.value);
    },
    doUpdate(value) {
      if (this.update) {
        this.update(value);
        this.$emit("rerender");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.NodeContextMenu {
  color: #666;

  .pane {
    padding: 4px 0;
    box-shadow: @box-shadow-base;

    background: #fff;
    box-shadow: 0 0 10 #0002;
    border: 1px solid @border-color-base;
    border-radius: @border-radius-base;
  }
  .submenu {
    position: absolute;
    top: 0;
    left: 100%;
    .item {
      width: calc(100% - 20px);
      white-space: nowrap;
    }
  }
  .item {
    min-width: 80px;
    text-align: left;
    transition: all 0.3s;
    cursor: pointer;
    height: 24px;
    padding: 2px 10px 2px 10px;
    &.hover,
    &:hover {
      color: #fff;
      background: @text-color-secondary;
    }
    &:active {
      background: @text-color;
    }
  }
}
</style>


