import VariableTreeNode from "./VariableTreeNode";
export default class URuleDecisionTree {
  constructor(data, parser) {
    // debugger;
    this.root = null;
    if (data.variableTreeNode) {
      this.root = new VariableTreeNode(data.variableTreeNode, null, parser);
    } else {
      throw new Error("非variableTreeNode");
    }
  }
}
