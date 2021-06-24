import Enc from "@root/encoding";
import FunctionNotImplementedException from "@/lib/browser/exception/FunctionNotImplementedException";
import NetworkElement from "@/lib/browser/element/NetworkElement";

const _ = {
  parseHeaders(source) {
    let headers = {};
    for (const item of source) {
      const str = Enc.hexToStr(item);
      const split = str.split(': ');
      headers[split[0]] = split[1];
    }
    return headers;
  }
}

const funcs = {
  get({answerId, url, headers}) {
    return new NetworkElement(answerId, 'get', Enc.hexToStr(url), _.parseHeaders(headers));
  },
  post({answerId, url, headers, body}) {
    return new NetworkElement(answerId, 'post', Enc.hexToStr(url), _.parseHeaders(headers), Enc.hexToStr(body));
  },
};

export default {
  id: 'e38aed5884dc3e4426a87c083faaf4fa08109189fbc0c79281112f52e062d8ee',
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
            {"name": "url", "type": "bytes"},
            {"name": "headers", "type": "bytes[]"}
          ],
          "outputs": [
            {"name": "statusCode", "type": "int32"},
            {"name": "retHeaders", "type": "bytes[]"},
            {"name": "content", "type": "bytes"}
          ]
        },
        {
          "name": "post",
          "inputs": [
            {"name": "answerId", "type": "uint32"},
            {"name": "url", "type": "bytes"},
            {"name": "headers", "type": "bytes[]"},
            {"name": "body", "type": "bytes"}
          ],
          "outputs": [
            {"name": "statusCode", "type": "int32"},
            {"name": "retHeaders", "type": "bytes[]"},
            {"name": "content", "type": "bytes"}
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
