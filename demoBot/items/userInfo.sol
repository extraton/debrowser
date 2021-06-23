pragma ton -solidity >=0.35.0;

import "../DeBot-IS-consortium/Menu/Menu.sol";
import "../DeBot-IS-consortium/Terminal/Terminal.sol";
import "../DeBot-IS-consortium/UserInfo/UserInfo.sol";

contract UserInfoItem {
    function userInfoStart(uint32 index) public {
        index = index;
        Terminal.print(tvm.functionId(userInfoMenu), "");
    }

    function userInfoMenu() public {
        Menu.select("Interface 'User Info'", "", [
            MenuItem("Get Account", "", tvm.functionId(userInfoGetAccount)),
            MenuItem("Get PublicKey", "", tvm.functionId(userInfoGetPublicKey)),
            MenuItem("Back", "", 0x02)
            ]);
    }

    function userInfoGetAccount(uint32 index) public {
        index = index;
        UserInfo.getAccount(tvm.functionId(userInfoPrintAccount));
    }

    function userInfoPrintAccount(address addr) public {
        Terminal.print(tvm.functionId(userInfoMenu), format("Your address:\n{}", addr));
    }

    function userInfoGetPublicKey(uint32 index) public {
        index = index;
        UserInfo.getPublicKey(tvm.functionId(userInfoPrintPublicKey));
    }

    function userInfoPrintPublicKey(address pub) public {
        Terminal.print(tvm.functionId(userInfoMenu), format("Your public key:\n{}", pub));
    }
}
