export default class MediaElement {
  constructor(data, prompt, answerId) {
    this.tab = null;
    this.inputMsg = null;
    this.isUsed = false;
    this.data = data;
    this.prompt = prompt;
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
