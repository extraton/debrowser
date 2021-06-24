pragma ton -solidity >=0.35.0;

import "../DeBot-IS-consortium/Terminal/Terminal.sol";
import "../DeBot-IS-consortium/SigningBoxInput/SigningBoxInput.sol";

contract signingBoxInputItem {
    uint256[] SigningBoxInputPossiblePublicKeys;

    function signingBoxInputStart(uint32 index) public {
        index = index;
        SigningBoxInput.get(tvm.functionId(signingBoxInputPrint), "Debot require a key", SigningBoxInputPossiblePublicKeys);
    }

    function signingBoxInputPrint(uint32 handle) public {
        Terminal.print(0x01, format("Signing Box Handle: {}", handle));
    }
}
