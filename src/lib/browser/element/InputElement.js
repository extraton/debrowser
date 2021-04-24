export default class InputElement {
  constructor(title, answerId, multiline) {
    this.tab = null;
    this.inputMsg = null;
    this.isUsed = false;
    this.title = title;
    this.answerId = answerId;
    this.multiline = multiline;
    this.value = null;
  }

  setTab(tab) {
    this.tab = tab;
  }

  setInputMsg(msg) {
    this.inputMsg = msg;
  }

  setUsed() {
    this.isUsed = true;
  }

  setValue(value) {
    this.value = value;
  }
}
