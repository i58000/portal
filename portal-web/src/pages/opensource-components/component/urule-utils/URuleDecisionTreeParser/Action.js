import Value from "./Value";

export default class Action {
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
