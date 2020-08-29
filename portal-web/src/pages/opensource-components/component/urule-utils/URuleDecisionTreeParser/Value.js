export default class Value {
  constructor({ content, valueType } = {}) {
    this.content = content;
    this.valueType = valueType;
  }
  text() {
    return this.content === undefined ? "*请输入*" : this.content;
  }
}
