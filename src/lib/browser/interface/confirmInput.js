import FunctionNotImplementedException from "@/lib/browser/exception/FunctionNotImplementedException";
import Enc from "@root/encoding";
import InputConfirmElement from "@/lib/browser/element/InputConfirmElement";

const funcs = {
  get({answerId, prompt}) {
    return new InputConfirmElement(Enc.hexToStr(prompt), answerId,);
  }
};

export default {
  id: '16653eaf34c921467120f2685d425ff963db5cbb5aa676a62a2e33bfc3f6828a',
  abi: {
    type: 'Contract',
    value: {
      "ABI version": 2,
      "header": ["time"],
      "functions": [
        {
          "name": "get",
          "inputs": [
            {"name": "answerId", "type": "uint32"},
            {"name": "prompt", "type": "bytes"}
          ],
          "outputs": [
            {"name": "value", "type": "bool"}
          ]
        }
      ],
      "data": [],
      "events": []
    }
  },
  call(func, params) {
    if (typeof funcs[func] === 'undefined') {
      throw new FunctionNotImplementedException();
    }
    return funcs[func](params);
  },
}
