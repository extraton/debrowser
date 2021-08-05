export default class DebotInfoElement {
  constructor(info) {
    this.tab = null;
    this.inputMsg = null;
    this.isUsed = false;
    this.info = info;
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
