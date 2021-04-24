export default class FatalElement {
  constructor(tab, exception) {
    this.tab = tab;
    this.exception = exception;
    this.isUsed = false;
  }

  setUsed() {
    this.isUsed = true;
  }
}
