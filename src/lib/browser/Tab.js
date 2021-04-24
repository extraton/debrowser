import FatalElement from "@/lib/browser/element/FatalElement";
import tonApi from "@/api/ton";
import {DebotModule} from "@tonclient/core";
import Callbacks from "@/lib/browser/Callbacks";
import SelectKeyElement from "@/lib/browser/element/SelectKeyElement";
import store from "@/store";

export default class Tab {
  constructor(id) {
    this.id = id;
    this.epoch = 1;
    this.clearVariables();
  }

  clearVariables() {
    this.title = store.state.i18n.t('appBar.tabs.home');
    this.address = {server: '', account: ''};
    this.client = null;
    this.debotModule = null;
    this.signingBox = null;
    this.debot = null;
    this.elements = [];
    this.fetching = false;
    this.loading = false;
    this.launched = false;
  }

  async init(address, epoch) {
    const client = await tonApi.getClient(address.server);
    const debotModule = new DebotModule(client);
    let debot;
    try {
      debot = await debotModule.init({address: address.account}, new Callbacks(this, epoch));
    } catch (e) {
      await this.fatal(e, epoch);
      return;
    }
    if (epoch === this.epoch) {
      this.client = client;
      this.debotModule = debotModule;
      this.debot = debot;
      this.fetching = false;
      this.title = this.debot.info.name || store.state.i18n.t('appBar.tabs.untitled');
    }
  }

  async start() {
    this.launched = true;
    this.loading = true;
    try {
      await this.debotModule.start({debot_handle: this.debot.debot_handle});
      this.loading = false;
    } catch (e) {
      await this.fatal(e);
    }
  }

  async setAddress(server, account) {
    this.epoch++;
    await this.stopDebotIfActive();
    this.clearVariables();
    this.address = {server, account};
    this.fetching = true;
    await this.init(this.address, this.epoch);
  }

  setSigningBox(signingBox) {
    this.signingBox = signingBox;
  }

  async resetAddress() {
    this.epoch++;
    await this.stopDebotIfActive();
    this.clearVariables();
  }

  isItHome() {
    return this.address.server === '' && this.address.account === '';
  }

  isLoading() {
    let isLastElementUnusedSelectKey = false;
    const elementsNum = this.elements.length;
    if (elementsNum > 0) {
      const lastElement = this.elements[elementsNum - 1];
      if (lastElement instanceof SelectKeyElement) {
        isLastElementUnusedSelectKey = !lastElement.isUsed;
      }
    }
    return this.loading && !isLastElementUnusedSelectKey;
  }

  async execute(inputMsg, function_name, epoch, input = {}) {
    try {
      this.loading = true;
      const message = (await this.client.abi.encode_internal_message({
        abi: {type: 'Json', value: this.debot.debot_abi},
        address: inputMsg.src,
        src_address: inputMsg.dst,
        call_set: {function_name, input},
        value: '0'
      })).message;
      await this.debotModule.send({debot_handle: this.debot.debot_handle, message});
      this.loading = false;
    } catch (e) {
      await this.fatal(e, epoch);
    }
  }

  addSelectKeyElement(Element, epoch) {
    if (this.epoch === epoch) {
      this.elements.push(Element);
    }
  }

  async refresh() {
    if (!this.isItHome()) {
      this.epoch++;
      const address = Object.assign({}, this.address);
      this.clearVariables();
      await this.setAddress(address.server, address.account);
    }
  }

  async fatal(e, epoch = null) {
    if (null === epoch || this.epoch === epoch) {
      this.epoch++;
      this.fetching = false;
      this.loading = false;
      this.elements.push(new FatalElement(this, e));
      await this.stopDebotIfActive();
    }
  }

  async stopDebotIfActive() {
    if (null !== this.debot && null !== this.debotModule) {
      try {
        await this.debotModule.remove({debot_handle: this.debot.debot_handle});
      } catch (e) {
        console.error({message: 'Error stop debot', e});
      }
    }
  }
}
