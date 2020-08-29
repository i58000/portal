import NodeType from "./NodeType";

export default class URuleDecisionTreeParser {
  constructor(data, vl) {
    this.remark = data.remark;
    this.libraries = data.libraries;
    console.log(this);
    this.vl = vl;
    this.tree = new URuleDecisionTree(data, this);
  }
}

class URuleDecisionTree {
  constructor(data, parser) {
    this.root = null;
    if (data.variableTreeNode) {
      this.root = new VariableTreeNode(data.variableTreeNode, null, parser);
    } else {
      throw new Error("非variableTreeNode");
    }
  }
}

/**
 * treenode
 */
class TreeNode {
  constructor(node, parent, parser) {
    // debugger;
    this.nodeType = node.nodeType;
    this._parent = parent;
    this._elements = [];
    this._parser = parser;

    if (node.conditionTreeNodes) {
      node.conditionTreeNodes.forEach(child => {
        this._elements.push(new ConditionTreeNode(child, this, this._parser));
      });
    }
    if (node.variableTreeNodes) {
      node.variableTreeNodes.forEach(child => {
        this._elements.push(new VariableTreeNode(child, this, this._parser));
      });
    }
    if (node.actionTreeNodes) {
      node.actionTreeNodes.forEach(child => {
        this._elements.push(new ActionTreeNode(child, this, this._parser));
      });
    }
  }
  append(nodeType) {
    debugger;
    const newnode = { nodeType: nodeType.value };
    switch (nodeType) {
      case NodeType.VARIABLE:
        this._elements.push(new VariableTreeNode(newnode, this, this._parser));
        break;
      case NodeType.CONDITION:
        this._elements.push(new ConditionTreeNode(newnode, this, this._parser));
        break;
      case NodeType.ACTION:
        if (this.nodeType === NodeType.ACTION.value) {
          // debugger;
          this.actions.push(new Action());
        } else {
          this._elements.push(new ActionTreeNode(newnode, this, this._parser));
        }
        break;
    }
  }
  remove() {
    const index = this._parent._elements.findIndex(x => x === this);
    this._parent._elements.splice(index, 1);
  }
  key() {
    return `${this.nodeType}-${this.op && this.op._value}-${this.value &&
      this.value.content}`;
  }
}
class VariableTreeNode extends TreeNode {
  constructor(node, parent, parser) {
    super(node, parent, parser);
    this.left = new Left(node.left);
  }
  text() {
    const { variableCategory, variableLabel } = this.left.leftPart;
    if (variableCategory === undefined || variableLabel === undefined) {
      return "*请选择*";
    } else {
      return `${variableCategory}的${variableLabel}`;
    }
  }
  appendable() {
    return [NodeType.CONDITION];
  }
  input(type, node) {
    // debugger;
    if (type === "variable") {
      // debugger;
      return {
        options: this._parser.vl.map(x => {
          return {
            label: x.name,
            children: x.variables.map(y => {
              return {
                label: y.label,
                value: {
                  leftPart: {
                    variableName: y.name,
                    variableLabel: y.label,
                    variableCategory: x.name,
                    datatype: y.dataType
                  },
                  type: "variable"
                }
              };
            })
          };
        }),
        update(newValue) {
          node.left = new Left(newValue);
        }
      };
    }
  }
}

class ConditionTreeNode extends TreeNode {
  constructor(node, parent, parser) {
    super(node, parent, parser);
    this.op = new Op(node.op);
    this.value = new Value(node.value);
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
class ActionTreeNode extends TreeNode {
  constructor(node, parent, parser) {
    super(node, parent, parser);
    this.actions = [];
    node.actions &&
      node.actions.forEach(action => {
        this.actions.push(new Action(action));
      });
    if (this.actions.length === 0) {
      this.actions.push(new Action());
    }
  }
  appendable() {
    return [NodeType.ACTION];
  }
  input(type, action) {
    if (type === "actionType") {
      return {
        update(newValue) {
          action.actionType = newValue;
        },
        options: Action._map
      };
    } else if (type === "variable") {
      return {
        options: this._parser.vl.map(x => {
          return {
            label: x.name,
            children: x.variables.map(y => {
              return {
                label: y.label,
                value: {
                  variableName: y.name,
                  variableLabel: y.label,
                  variableCategory: x.name,
                  datatype: y.dataType,
                  type: "variable"
                }
              };
            })
          };
        }),
        update(newValue) {
          Object.assign(action, newValue);
        }
      };
    } else if (type === "value") {
      return {
        update(newValue) {
          // debugger;
          console.log(action);
          action.value = new Value(newValue);
        }
      };
    }
  }
}

class Left {
  constructor({ type, leftPart } = {}) {
    this.type = type;
    this.leftPart = new LeftPart(leftPart);
  }
}

class LeftPart {
  constructor({
    variableName,
    variableLabel,
    variableCategory,
    datatype
  } = {}) {
    this.variableName = variableName;
    this.variableLabel = variableLabel;
    this.variableCategory = variableCategory;
    this.datatype = datatype;
  }
}

class Value {
  constructor({ content, valueType } = {}) {
    this.content = content;
    this.valueType = valueType;
  }
  text() {
    return this.content === undefined ? "*请输入*" : this.content;
  }
}

class Action {
  constructor({
    actionType,
    type,
    datatype,
    variableCategory,
    variableLabel,
    variableName,
    value,
    priority
  } = {}) {
    this.actionType = actionType;
    this.type = type;
    this.datatype = datatype;
    this.variableCategory = variableCategory;
    this.variableLabel = variableLabel;
    this.variableName = variableName;
    this.value = new Value(value);
    this.priority = priority;
  }
  static _map = [
    { label: "赋值", value: "VariableAssign" },
    { label: "打印内容", value: "ConsolePrint" },
    { label: "执行函数", value: "ExecuteCommonFunction" }
  ];
  text(key) {
    switch (key) {
      case "actionType":
        const temp = Action._map.find(x => x.value === this.actionType);
        return (temp && temp.label) || "*请选择*";
      case "variable":
        if (
          this.variableCategory === undefined ||
          this.variableLabel === undefined
        ) {
          return "*请选择*";
        } else {
          return `${this.variableCategory}的${this.variableLabel}`;
        }
      case "value":
        return this.value.text();

      default:
        throw new Error("未知的key");
    }
  }
}
class Op {
  constructor(op) {
    this._value = op;
  }
  static _map = [
    { label: "等于", value: "Equals" },
    { label: "不等于", value: "NotEquals" },
    { label: "小于", value: "LessThen" },
    { label: "大于", value: "GreaterThen" },
    { label: "小于或等于", value: "LessThenEquals" },
    { label: "大于或等于", value: "GreaterThenEquals" }
  ];

  text() {
    if (this._value === undefined) {
      return "*请选择*";
    } else {
      const temp = Op._map.find(x => x.value === this._value);
      return temp ? temp.label : this._value;
    }
  }
}
