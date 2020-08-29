class NodeType {
  constructor(value, label) {
    this.value = value;
    this.label = label;
  }
  getValue() {
    return this.value;
  }
  getLabel() {
    return this.label;
  }
}

NodeType.VARIABLE = new NodeType("variable", "变量");
NodeType.CONDITION = new NodeType("condition", "条件");
NodeType.ACTION = new NodeType("action", "动作");

Object.freeze(NodeType);

export default NodeType;
