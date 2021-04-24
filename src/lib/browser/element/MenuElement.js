export default class MenuElement {
  constructor(title, choices) {
    this.tab = null;
    this.inputMsg = null;
    this.isUsed = false;
    this.title = title;
    this.choices = choices;
    this.selectedItem = null;
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

  setSelectedItem(value) {
    this.selectedItem = value;
  }
}
