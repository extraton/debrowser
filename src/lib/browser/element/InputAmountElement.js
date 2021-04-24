export default class InputAmountElement {
  constructor(title, answerId, min, max, decimals) {
    this.tab = null;
    this.inputMsg = null;
    this.isUsed = false;
    this.title = title;
    this.answerId = answerId;
    this.min = min;
    this.max = max;
    this.decimals = decimals;
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
