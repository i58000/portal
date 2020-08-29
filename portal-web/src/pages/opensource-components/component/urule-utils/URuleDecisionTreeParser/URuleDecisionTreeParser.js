import URuleDecisionTree from "./URuleDecisionTree";

export default class URuleDecisionTreeParser {
  constructor(data, vl) {
    this.remark = data.remark;
    this.libraries = data.libraries;
    console.log(this);
    this.vl = vl;
    this.tree = new URuleDecisionTree(data, this);
  }
}
