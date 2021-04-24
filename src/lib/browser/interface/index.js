import terminalInterface from "@/lib/browser/interface/terminal";
import amountInput from "@/lib/browser/interface/amountInput";
import menuInterface from "@/lib/browser/interface/menu";
import confirmInput from "@/lib/browser/interface/confirmInput";
import addressInput from "@/lib/browser/interface/addressInput";
import numberInput from "@/lib/browser/interface/numberInput";
import CallInterfaceException from "@/lib/browser/exception/CallInterfaceException";
import FunctionNotImplementedException from "@/lib/browser/exception/FunctionNotImplementedException";

const interfaces = [terminalInterface, menuInterface, amountInput, confirmInput, addressInput, numberInput];

export default {
  async call(Tab, id, msg) {
    for (const ifc of interfaces) {
      if (ifc.id === id) {
        const decodedBody = await Tab.client.abi.decode_message_body({abi: ifc.abi, body: msg.body, is_internal: true});
        const func = decodedBody.name;
        const params = decodedBody.value;
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
    throw new CallInterfaceException(`Implementation of interface '${id}' was not found`);
  }
}
