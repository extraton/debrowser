import DebotUseActionsException from "@/lib/browser/exception/DebotUseActionsException";
import SelectKeyElement from "@/lib/browser/element/SelectKeyElement";
import store from "@/store";

export default function Callbacks(Tab, epoch) {
  this.messages = [];
  this.get_signing_box = function () {
    return new Promise((resolve, reject) => {
      if (null !== Tab.signingBox) {
        resolve(Tab.signingBox);
      } else {
        const Element = new SelectKeyElement(Tab, resolve, reject);
        Tab.addElement(Element, epoch);
      }
    });
  }
  this.send = async function (ParamsOfAppDebotBrowserSend) {
    this.messages.push(ParamsOfAppDebotBrowserSend);
  }
  this.approve = function (params) {
    return new Promise((resolve) => {
      store.dispatch('approve/init', {activity: params.activity, resolve});
    });
  }
  this.log = function (/*ParamsOfAppDebotBrowserLog*/) {
    // console.log(ParamsOfAppDebotBrowserLog)
  }
  this.switch = function (/*ParamsOfAppDebotBrowserSwitch*/) {
    // console.log(ParamsOfAppDebotBrowserSwitch)
  }
  this.switch_completed = function () {
    // console.log('switch_completed');
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
