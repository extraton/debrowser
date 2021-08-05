import FatalElement from "@/lib/browser/element/FatalElement";
import tonApi from "@/api/ton";
import {DebotModule} from "@tonclient/core";
import Callbacks from "@/lib/browser/Callbacks";
import SelectKeyElement from "@/lib/browser/element/SelectKeyElement";
import store from "@/store";
import DebotInfoElement from "@/lib/browser/element/DebotInfoElement";
import loopMessages from "@/lib/browser/loopMessages";

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
    this.engine = null;
    this.signingBox = null;
    this.key = null;
    this.debots = {};
    this.currentDebotAddress = null;
    this.elements = [];
    this.fetching = false;
    this.loading = false;
    this.launched = false;
    this.messages = [];
    this.isMessagesLooping = false;
  }

  async init(address, epoch) {
    const client = await tonApi.getClient(address.server);
    this.engine = new DebotModule(client);
    let debot, callbacks;
    try {
      callbacks = new Callbacks(this, epoch);
      debot = await this.engine.init({address: address.account}, callbacks);
    } catch (e) {
      await this.fatal(e, epoch);
      return;
    }
    if (epoch === this.epoch) {
      this.client = client;
      this.debots[address.account] = {debot, callbacks};
      this.currentDebotAddress = address.account;
      this.fetching = false;
      this.title = this.debots[this.currentDebotAddress].debot.info.name || store.state.i18n.t('appBar.tabs.untitled');
      const Element = new DebotInfoElement(debot.info);
      this.addElement(Element, epoch);
    }
  }

  async addDebot(address, epoch) {//@TODO partially duplicated
    this.loading = true;
    let debot, callbacks;
    try {
      callbacks = new Callbacks(this, epoch);
      debot = await this.engine.init({address}, callbacks);
    } catch (e) {
      await this.fatal(e, epoch);
      this.loading = false;
      return;
    }
    if (epoch === this.epoch) {
      this.debots[address] = {debot, callbacks};
      this.currentDebotAddress = address;
      const Element = new DebotInfoElement(debot.info);
      this.addElement(Element, epoch);
    }
    this.loading = false;
  }

  async switchDebot(address, epoch) {
    if ('undefined' === typeof this.debots[address]) {
      await this.addDebot(address, epoch);
    } else {
      this.currentDebotAddress = address;
      await loopMessages(this, epoch);
    }
  }

  async start() {
    this.loading = true;
    const debot = this.debots[this.currentDebotAddress];
    try {
      await this.engine.start({debot_handle: debot.debot.debot_handle});
      this.loading = false;
    } catch (e) {
      await this.fatal(e);
      return;
    }
    const newMessages = debot.callbacks.messages.splice(0, debot.callbacks.messages.length);
    if (!this.launched) {
      this.launched = true;
      this.messages.push(...newMessages);
    }
    await loopMessages(this, this.epoch);
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

  setKey(key) {
    this.key = key;
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
    const debotAddress = inputMsg.src;
    const debot = this.debots[debotAddress];
    try {
      this.loading = true;
      const message = (await this.client.abi.encode_internal_message({
        abi: {type: 'Json', value: debot.debot.debot_abi},
        address: debotAddress,
        // src_address: inputMsg.dst,
        call_set: {function_name, input},
        value: '1000000000000000'
      }));
      await this.engine.send({debot_handle: debot.debot.debot_handle, message: message.message});
      this.loading = false;
    } catch (e) {
      await this.fatal(e, epoch);
      return;
    }
    const newMessages = debot.callbacks.messages.splice(0, debot.callbacks.messages.length);
    this.messages.push(...newMessages);
    await loopMessages(this, epoch);
  }

  addElement(Element, epoch) {
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
    if (null !== this.currentDebotAddress) {
      try {
        const debot = this.debots[this.currentDebotAddress].debot;
        await this.engine.remove({debot_handle: debot.debot_handle});
        this.debots[this.currentDebotAddress] = undefined;
        this.currentDebotAddress = null;
      } catch (e) {
        console.error({message: 'Error stop debot', e});
      }
    }
  }
}
