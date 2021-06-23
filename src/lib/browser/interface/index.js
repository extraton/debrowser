import terminalInterface from "@/lib/browser/interface/terminal";
import amountInput from "@/lib/browser/interface/amountInput";
import menuInterface from "@/lib/browser/interface/menu";
import confirmInput from "@/lib/browser/interface/confirmInput";
import addressInput from "@/lib/browser/interface/addressInput";
import numberInput from "@/lib/browser/interface/numberInput";
import qrCode from "@/lib/browser/interface/qrCode";
import userInfo from "@/lib/browser/interface/userInfo";
import CallInterfaceException from "@/lib/browser/exception/CallInterfaceException";
import FunctionNotImplementedException from "@/lib/browser/exception/FunctionNotImplementedException";
import SelectKeyElement from "@/lib/browser/element/SelectKeyElement";

const interfaces = [terminalInterface, menuInterface, amountInput, confirmInput, addressInput, numberInput, qrCode, userInfo];

const _ = {
  getInterface(id) {
    for (const ifc of interfaces) {
      if (ifc.id === id) {
        return ifc;
      }
    }
    throw new CallInterfaceException(`Implementation of interface '${id}' was not found`);
  }
}

export default {
  async call(Tab, id, msg) {
    const ifc = _.getInterface(id);
    const decodedBody = await Tab.client.abi.decode_message_body({abi: ifc.abi, body: msg.body, is_internal: true});
    const func = decodedBody.name;
    const params = decodedBody.value;
    if (ifc.id === userInfo.id) {
      const resolve = function () {
        const input = ifc.call(Tab, func, params);
        Tab.execute(msg, params.answerId, Tab.epoch, input);
      }
      if (null === Tab.key) {
        const reject = function () {
          throw 'Reject select key';
        }
        return new SelectKeyElement(Tab, resolve, reject);
      } else {
        resolve();
        return null;
      }
    } else {
      try {
        const Element = ifc.call(func, params);
        Element.setTab(Tab);
        Element.setInputMsg(msg);

        return Element;
      } catch (e) {
        if (e instanceof FunctionNotImplementedException) {
          throw new CallInterfaceException(`Function '${func}' of interface '${id}' isn't implemented.`);
        } else {
          throw e;
        }
      }
    }
  }
}
