import TreeNode from "./TreeNode";
import { parseChildren, appendChild } from "./TreeNodeFactory";
import NodeType from "./NodeType";

import Op from "./Op";
import Value from "./Value";

export default class ConditionTreeNode extends TreeNode {
  constructor(node, parent, parser) {
    super(node, parent, parser);
    this.op = new Op(node.op);
    this.value = new Value(node.value);

    parseChildren(node, this);
  }
  append(nodeType) {
    appendChild(nodeType, this);
  }

  text() {
    return [this.op.text(), this.value.text()];
  }
  appendable() {
    return [NodeType.CONDITION, NodeType.VARIABLE, NodeType.ACTION];
  }
  input(type, node) {
    if (type === "op") {
      return {
        update(newValue) {
          node.op = new Op(newValue);
        },
        options: Op._map
      };
    } else if (type === "value") {
      return {
        update(newValue) {
          node.value = new Value(newValue);
        }
      };
    } else {
      throw new Error("未知的input类型");
    }
  }
}
