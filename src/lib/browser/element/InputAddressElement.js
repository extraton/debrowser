export default class InputAddressElement {
  constructor(title, answerId) {
    this.tab = null;
    this.inputMsg = null;
    this.isUsed = false;
    this.title = title;
    this.answerId = answerId;
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
