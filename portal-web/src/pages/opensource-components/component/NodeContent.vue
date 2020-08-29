<template>
  <div class="node-wrapper">
    <div class="node-content" v-contextmenu:append.trigger="node" :class="node.nodeType">
      <!-- 变量 -->
      <div class="nowrap" v-if="node.nodeType === 'variable'">
        <span
          class="editable"
          v-contextmenu:input.trigger.click="node.input('variable', node)"
        >{{ node.text() }}</span>
      </div>

      <!-- 条件 -->
      <div class="nowrap" v-else-if="node.nodeType === 'condition'">
        <span
          class="editable"
          v-contextmenu:input.trigger.click="node.input('op', node)"
        >{{ node.text()[0] }}</span>
        <span
          v-show="!editable"
          class="editable"
          @click="editable = true; valueContent = node.value.content; $nextTick(()=>{ $emit('rerender'); $refs.input.focus() })"
        >{{ node.text()[1] }}</span>
        <input
          v-show="editable"
          class="editable"
          ref="input"
          v-model="valueContent"
          tabindex="0"
          @blur="editable = false; node.value.content = valueContent; node.input('value', node).update(node.value); $emit('rerender')"
        >
      </div>

      <!-- 动作 -->
      <div v-else-if="node.nodeType === 'action'" class="nowrap">
        <div class="nowrap item-action" v-for="(item, index) in node.actions" :key="index">
          <!-- {{item}} -->
          <span
            class="editable"
            v-contextmenu:input.trigger.click="node.input('actionType', item)"
            v-text="item.text('actionType')"
          ></span>
          <span>:</span>
          <span
            class="editable"
            v-contextmenu:input.trigger.click="node.input('variable', item)"
            v-text="item.text('variable')"
          ></span>
          <span>=</span>
          <span
            v-show="!item._editable"
            class="editable"
            v-text="item.text('value')"
            @click="$set(item,'_editable',true); valueContent = item.value.content; $nextTick(()=>{ $emit('rerender'); $refs.input[index].focus() })"
          ></span>
          <input
            v-show="item._editable"
            class="editable"
            ref="input"
            v-model="valueContent"
            tabindex="0"
            @blur="$set(item,'_editable',false); item.value.content = valueContent; node.input('value', item).update(item.value); $emit('rerender')"
          >
          <i class="remove" @click="node.removeAction(item); $emit('rerender')">x</i>
        </div>
      </div>
      <!-- 其他 -->
      <div v-else>
        <span class="editable">UNKNOWN</span>
      </div>

      <i
        v-if="node._elements && node._elements.length > 0"
        v-text="node._hideChildren ? '>' : '<'"
        @click="$set(node, '_hideChildren', !node._hideChildren); childrenVisible(!node._hideChildren); $emit('rerender')"
        :style="{opacity: node._hideChildren ? 1 : 0.3}"
      ></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    node: {},
    childrenVisible: Function
  },
  data() {
    return {
      editable: false,
      valueContent: null
    };
  }
};
</script>
<style lang="less" scoped>
.nowrap {
  white-space: nowrap;
  text-align: left;
}
.editable {
  cursor: pointer;
  border: 1px dashed transparent;
  border-radius: @border-radius-base;
  padding: 2px 4px;
  margin: 2px 0px;
  &:hover {
    border-color: #fff;
  }
}
.node-wrapper {
  margin: 4px 4px;
  .node-content {
    color: #fff;
    background: #fff;
    padding: 8px 8px;
    box-shadow: @box-shadow-base;
    border: 1px solid @border-color-base;
    border-radius: @border-radius-base;
    display: flex;
    i {
      transition: all 0.3s;
      margin-left: 10px;
      background: #000;
      opacity: 0.5;
      display: inline-block;
      font-size: normal;
      line-height: 19px;
      text-align: center;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      color: #fff;
      cursor: pointer;
      #mixin-button(@color) {
        @colorFaded: fadeout(@color, 80%);
        background: fadein(@colorFaded, 30%);
        &:hover {
          background: fadein(@colorFaded, 70%);
        }
        &:active {
          background: fadein(@colorFaded, 100%);
        }
      }
      #mixin-button(#000);
      &.remove {
        #mixin-button(@error-color);
      }
    }

    &.variable {
      background: @primary-color;
    }
    &.condition {
      background: @warning-color;
    }
    &.action {
      background: @success-color;
    }
    .item-action {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
