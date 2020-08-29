export default class Op {
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
