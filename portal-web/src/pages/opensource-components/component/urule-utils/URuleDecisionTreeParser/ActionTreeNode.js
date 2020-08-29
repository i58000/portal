import TreeNode from "./TreeNode";
import { parseChildren, appendChild } from "./TreeNodeFactory";
import NodeType from "./NodeType";

import Action from "./Action";
import Value from "./Value";

export default class ActionTreeNode extends TreeNode {
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

    parseChildren(node, this);
  }
  append(nodeType) {
    appendChild(nodeType, this);
  }
  appendable() {
    return [NodeType.ACTION];
  }
  removeAction(action) {
    const index = this.actions.findIndex(x => x === action);
    this.actions.splice(index, 1);
    if (this.actions.length === 0) {
      this.remove();
    }
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
