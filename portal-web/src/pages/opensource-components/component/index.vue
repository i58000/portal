<template>
  <div class="hello">
    <div style="height: 140px;">
      <div class="link">
        <Tag color="orange">npm</Tag>
        <Button
          type="link"
          style="padding: 0;"
          @click="open('https://www.npmjs.com/package/vue-treecharts')"
        >https://www.npmjs.com/package/vue-treecharts</Button>
      </div>
      <div class="link">
        <Tag color="orange">npm</Tag>
        <Button
          type="link"
          style="padding: 0;"
          @click="open('https://www.npmjs.com/package/vue-v-contextmenu')"
        >https://www.npmjs.com/package/vue-v-contextmenu</Button>
      </div>
      <br />
      <span class="node">右键新增/删除节点，左键编辑</span>
      <span class="node variable">变量</span>
      <span class="node condition">条件</span>
      <span class="node action">动作</span>
    </div>

    <TreeChart
      ref="tree"
      :data="treedata"
      :childrenKey="'_elements'"
      :lineColor="'#0009'"
      :lineWidth="1"
      :lineOffset="20"
      :transition="0.3"
      :nodeKey="item => item.key()"
    >
      <template v-slot="{node, childrenVisible}">
        <NodeContent
          :node="node"
          :childrenVisible="childrenVisible"
          @rerender="$refs.tree.rerender()"
        />
      </template>
    </TreeChart>

    <ContextMenuAppend @rerender="$refs.tree.rerender()" />
    <ContextMenuInput @rerender="$refs.tree.rerender()" />
  </div>
</template>

<script>
import { Tag, Button } from "ant-design-vue";
import TreeChart from "vue-treecharts";
import vContextmenu from "vue-v-contextmenu";

import NodeContent from "./NodeContent";

import ContextMenuAppend from "./ContextMenuAppend";
import ContextMenuInput from "./ContextMenuInput";

import URuleDecisionTreeParser from "./urule-utils/URuleDecisionTreeParser";
import tree_demo from "./tree_demo.dtree";
import customer_vl from "./Customer.vl.xml";

import Vue from "vue";
Vue.use(vContextmenu);

export default {
  components: {
    Tag,
    Button,
    TreeChart,
    NodeContent,
    ContextMenuAppend,
    ContextMenuInput
  },
  data() {
    return {
      treedata1: {
        data: { name: "root" },
        children: [
          {
            data: { name: "L1#1" },
            children: [
              {
                data: { name: "L2#1" }
              },
              {
                data: { name: "new暗室逢灯" },
                children: [
                  {
                    data: { name: "L3#1" }
                  }
                ]
              },
              {
                data: { name: "L2#3" }
              }
            ]
          },
          {
            data: {
              name: "L2#2"
            }
          },
          {
            data: {
              name: "L1#22222222222222222222"
            },
            children: [
              {
                data: { name: "L2#4" }
              },
              {
                data: { name: "L2#5" }
              },
              {
                data: { name: "L2#4" }
              },
              {
                data: { name: "L2#5" }
              },
              {
                data: { name: "L2#4" }
              },
              {
                data: { name: "L2#5" }
              }
            ]
          }
        ]
      },
      parser: null
    };
  },
  created() {
    const data = tree_demo[0];
    const vl = customer_vl[0];
    this.parser = new URuleDecisionTreeParser(data, vl);
    this.treedata = this.parser.tree.root;
  },
  methods: {
    open(url) {
      window.open(url, "_black");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  margin: 50px 20px;
}
.link {
  color: red;
  // height: 40px;
  margin-bottom: 10px;
}
.node {
  padding: 8px 10px;
  margin: 5px;
  border-radius: @border-radius-base;
  border: solid 1px @error-color;
  color: @error-color;
  #mixin-node(@color) {
    border-color: @color;
    color: @color;
  }
  &.condition {
    #mixin-node(@warning-color);
  }
  &.variable {
    #mixin-node(@primary-color);
  }
  &.action {
    #mixin-node(@success-color);
  }
}
</style>
