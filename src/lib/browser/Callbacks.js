import ifc from "@/lib/browser/interface";
import DebotUseActionsException from "@/lib/browser/exception/DebotUseActionsException";
import SelectKeyElement from "@/lib/browser/element/SelectKeyElement";
import store from "@/store";

const DEBOT_WC = '-31';

export default function Callbacks(Tab, epoch) {
  this.get_signing_box = function () {
    return new Promise((resolve, reject) => {
      if (null !== Tab.signingBox) {
        resolve(Tab.signingBox);
      } else {
        const Element = new SelectKeyElement(Tab, resolve, reject);
        Tab.addSelectKeyElement(Element, epoch);
      }
    });
  }
  this.send = async function (ParamsOfAppDebotBrowserSend) {
    try {
      const msg = (await Tab.client.boc.parse_message({boc: ParamsOfAppDebotBrowserSend.message})).parsed;
      const [dstWc, id] = msg.dst.split(':');
      if (DEBOT_WC === dstWc) {
        const Element = await ifc.call(Tab, id, msg, epoch);
        if (Tab.epoch === epoch) {
          Tab.elements.push(Element);
        }
      } else if (Tab.address.account === msg.dst) {
        await Tab.send(ParamsOfAppDebotBrowserSend.message, epoch);
      } else {
        throw {message: '[Not implemented] Call foreign debot.'};
      }
    } catch (e) {
      await Tab.fatal(e, epoch);
    }
  }
  this.approve = function (params) {
    console.log({approve: params})
    return new Promise((resolve) => {
      store.dispatch('approve/init', {activity: params.activity, resolve});
    });
  }
  this.log = function (ParamsOfAppDebotBrowserLog) {
    console.log(ParamsOfAppDebotBrowserLog)
  }
  this.switch = function (ParamsOfAppDebotBrowserSwitch) {
    console.log(ParamsOfAppDebotBrowserSwitch)
  }
  this.switch_completed = function () {
    console.log('switch_completed');
  }
  this.show_action = function () {
    Tab.fatal(new DebotUseActionsException(), epoch);
  }
  this.input = function (ParamsOfAppDebotBrowserInput) {
    console.log(ParamsOfAppDebotBrowserInput)
  }
  this.invoke_debot = function (ParamsOfAppDebotBrowserInvokeDebot) {
    console.log(ParamsOfAppDebotBrowserInvokeDebot)
  }
}
