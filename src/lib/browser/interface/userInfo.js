import FunctionNotImplementedException from "@/lib/browser/exception/FunctionNotImplementedException";

const funcs = {
  getAccount(Tab) {
    const value = null !== Tab.key.address
      ? Tab.key.address
      : '0:0000000000000000000000000000000000000000000000000000000000000000'
    return {value};
  },
  getPublicKey(Tab) {
    return {value: Tab.key.keys.public};
  }
};

export default {
  id: 'a56115147709ed3437efb89460b94a120b7fe94379c795d1ebb0435a847ee580',
  abi: {
    type: 'Contract',
    value: {
      "ABI version": 2,
      "header": ["time"],
      "functions": [
        {
          "name": "getAccount",
          "inputs": [
            {"name": "answerId", "type": "uint32"}
          ],
          "outputs": [
            {"name": "value", "type": "address"}
          ]
        },
        {
          "name": "getPublicKey",
          "inputs": [
            {"name": "answerId", "type": "uint32"}
          ],
          "outputs": [
            {"name": "value", "type": "uint256"}
          ]
        },
        {
          "name": "constructor",
          "inputs": [],
          "outputs": []
        }
      ],
      "data": [],
      "events": []
    }
  },
  call(Tab, func, params) {
    if (typeof funcs[func] === 'undefined') {
      throw new FunctionNotImplementedException();
    }
    return funcs[func](Tab, params);
  },
}
