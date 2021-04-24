export default class SelectKeyElement {
  constructor(tab, resolve, reject) {
    this.tab = tab;
    this.resolve = resolve;
    this.reject = reject;
    this.isUsed = false;
    this.keyId = null;
  }

  setUsed() {
    this.isUsed = true;
  }

  setKeyId(keyId) {
    this.keyId = keyId;
  }
}
