export default class Left {
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
