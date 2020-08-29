import TreeNode from "./TreeNode";
import { parseChildren, appendChild } from "./TreeNodeFactory";
import NodeType from "./NodeType";

import Left from "./Left";

export default class VariableTreeNode extends TreeNode {
  constructor(node, parent, parser) {
    super(node, parent, parser);
    this.left = new Left(node.left);

    parseChildren(node, this);
  }
  append(nodeType) {
    appendChild(nodeType, this);
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
