export default class TreeNode {
  static _countOfNodeKey = 1;
  constructor(node, parent, parser) {
    // debugger;
    this.nodeType = node.nodeType;
    this._parent = parent;
    this._elements = [];
    this._parser = parser;
    this._nodeKey = TreeNode._countOfNodeKey++;
  }
  remove() {
    if (this._parent) {
      const index = this._parent._elements.findIndex(x => x === this);
      this._parent._elements.splice(index, 1);
    } else {
      throw new Error("根节点无法删除");
    }
  }
  key() {
    // return `${this.nodeType}-${this.op && this.op._value}-${this.value &&
    //   this.value.content}`;
    return this._nodeKey;
  }
}
