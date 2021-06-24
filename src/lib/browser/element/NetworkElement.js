export default class NetworkElement {
  constructor(answerId, method, url, headers, body = null) {
    this.tab = null;
    this.inputMsg = null;
    this.isUsed = false;
    this.answerId = answerId;
    this.method = method;
    this.url = url;
    this.headers = headers;
    this.body = body;
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
