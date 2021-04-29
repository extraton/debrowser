pragma ton -solidity >=0.35.0;

import "../DeBot-IS-consortium/Terminal/Terminal.sol";
import "../DeBot-IS-consortium/AmountInput/AmountInput.sol";

contract AmountInputItem {
    function amountInputStart(uint32 index) public {
        index = index;
        AmountInput.get(tvm.functionId(amountInputPrint), "Enter any amount", 3, 0, 1000);
    }

    function amountInputPrint(int256 value) public {
        Terminal.print(0x01, format("You've written\n{}", value));
    }
}
