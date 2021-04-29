pragma ton -solidity >=0.35.0;

import "../DeBot-IS-consortium/Terminal/Terminal.sol";
import "../DeBot-IS-consortium/NumberInput/NumberInput.sol";

contract NumberInputItem {
    function numberInputStart(uint32 index) public {
        index = index;
        NumberInput.get(tvm.functionId(numberInputPrint), "Enter any number", 0, 1000);
    }

    function numberInputPrint(uint128 value) public {
        Terminal.print(0x01, format("You've written\n{}", value));
    }
}
