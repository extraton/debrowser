pragma ton -solidity >=0.35.0;

import "../DeBot-IS-consortium/Terminal/Terminal.sol";
import "../DeBot-IS-consortium/AddressInput/AddressInput.sol";

contract AddressInputItem {
    function addressInputStart(uint32 index) public {
        index = index;
        AddressInput.get(tvm.functionId(addressInputPrint), "Enter any address");
    }

    function addressInputPrint(address value) public {
        Terminal.print(0x01, format("You've written\n{}", value));
    }
}
