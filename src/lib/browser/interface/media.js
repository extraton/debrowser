import FunctionNotImplementedException from "@/lib/browser/exception/FunctionNotImplementedException";
import Enc from "@root/encoding";
import MediaElement from "../element/MediaElement";

const funcs = {
  output({data, prompt, answerId}) {
    return new MediaElement(Enc.hexToStr(data), Enc.hexToStr(prompt), answerId);
  }
};

export default {
  id: '59cdc2aafe53760937dac5b1c4b89ce12950f56a56298108a987cfe49b7c84b5',
  abi: {
    type: 'Contract',
    value: {
      "ABI version": 2,
      "header": ["time"],
      "functions": [
        {
          "name": "output",
          "inputs": [
            {"name": "answerId", "type": "uint32"},
            {"name": "prompt", "type": "bytes"},
            {"name": "data", "type": "bytes"}
          ],
          "outputs": [
            {"name": "result", "type": "uint8"}
          ]
        },
        {
          "name": "getSupportedMediaTypes",
          "inputs": [
            {"name": "answerId", "type": "uint32"}
          ],
          "outputs": [
            {"name": "mediaTypes", "type": "bytes"}
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
  call(func, params) {
    if (typeof funcs[func] === 'undefined') {
      throw new FunctionNotImplementedException();
    }
    return funcs[func](params);
  },
}
