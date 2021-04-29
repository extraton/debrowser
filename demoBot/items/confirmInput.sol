pragma ton -solidity >=0.35.0;

import "../DeBot-IS-consortium/Terminal/Terminal.sol";
import "../DeBot-IS-consortium/ConfirmInput/ConfirmInput.sol";

contract ConfirmInputItem {
    function confirmInputStart(uint32 index) public {
        index = index;
        ConfirmInput.get(tvm.functionId(confirmInputPrint), "Confirm or cancel");
    }

    function confirmInputPrint(bool value) public {
        if (value) {
            Terminal.print(0x01, "Confirmed");
        } else {
            Terminal.print(0x01, "Canceled");
        }
    }
}
