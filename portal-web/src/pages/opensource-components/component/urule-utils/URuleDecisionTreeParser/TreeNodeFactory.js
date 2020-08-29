import NodeType from "./NodeType";

import VariableTreeNode from "./VariableTreeNode";
import ConditionTreeNode from "./ConditionTreeNode";
import ActionTreeNode from "./ActionTreeNode";
import Action from "./Action";

export function appendChild(nodeType, that) {
  const newnode = { nodeType: nodeType.value };
  switch (nodeType) {
    case NodeType.VARIABLE:
      that._elements.push(new VariableTreeNode(newnode, that, that._parser));
      break;
    case NodeType.CONDITION:
      that._elements.push(new ConditionTreeNode(newnode, that, that._parser));
      break;
    case NodeType.ACTION:
      if (that.nodeType === NodeType.ACTION.value) {
        // debugger;
        that.actions.push(new Action());
      } else {
        that._elements.push(new ActionTreeNode(newnode, that, that._parser));
      }
      break;
  }
}
export function parseChildren(node, that) {
  if (node.conditionTreeNodes) {
    node.conditionTreeNodes.forEach(child => {
      that._elements.push(new ConditionTreeNode(child, that, that._parser));
    });
  }
  if (node.variableTreeNodes) {
    node.variableTreeNodes.forEach(child => {
      that._elements.push(new VariableTreeNode(child, that, that._parser));
    });
  }
  if (node.actionTreeNodes) {
    node.actionTreeNodes.forEach(child => {
      that._elements.push(new ActionTreeNode(child, that, that._parser));
    });
  }
}
