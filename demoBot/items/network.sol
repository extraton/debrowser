pragma ton -solidity >=0.35.0;

import "../DeBot-IS-consortium/Menu/Menu.sol";
import "../DeBot-IS-consortium/Network/Network.sol";
import "../DeBot-IS-consortium/UserInfo/UserInfo.sol";
import "../DeBot-IS-consortium/Terminal/Terminal.sol";

contract NetworkItem {
    function networkStart(uint32 index) public {
        index = index;
        Terminal.print(tvm.functionId(networkMenu), "");
    }

    function networkMenu() public {
        Menu.select("Interface 'Network'", "", [
            MenuItem("Get", "", tvm.functionId(networkGet)),
            MenuItem("Post", "", tvm.functionId(networkPost)),
            MenuItem("Back", "", 0x02)
            ]);
    }

    function networkGet(uint32 index) public {
        index = index;
        string[] headers;
        headers.push("Content-Type: application/x-www-form-urlencoded");
        Network.get(tvm.functionId(networkGetPrint), "https://ptsv2.com/t/qajss-1618330246/post", headers);
    }

    function networkGetPrint(int32 statusCode, string[] retHeaders, string content) public {
        require(statusCode == 200, 101);
        for (string hdr : retHeaders) {
            Terminal.print(0, hdr);
        }
        Terminal.print(tvm.functionId(networkMenu), content);
    }

    function networkPost(uint32 index) public {
        index = index;
        string[] headers;
        headers.push("Content-Type: application/x-www-form-urlencoded");
        string body = "key1=value1";
        Network.post(tvm.functionId(networkPostPrint), "https://ptsv2.com/t/qajss-1618330246/post", headers, body);
    }

    function networkPostPrint(int32 statusCode, string[] retHeaders, string content) public {
        require(statusCode == 200, 101);
        for (string hdr : retHeaders) {
            Terminal.print(0, hdr);
        }
        Terminal.print(tvm.functionId(networkMenu), content);
    }
}
