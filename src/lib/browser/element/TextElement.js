export default class TextElement {
  constructor(text, answerId) {
    this.tab = null;
    this.inputMsg = null;
    this.isUsed = false;
    this.text = text;
    this.answerId = answerId;
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
}
