pragma ton -solidity >=0.35.0;

import "../DeBot-IS-consortium/Terminal/Terminal.sol";
import "../DeBot-IS-consortium/QRCode/QRCode.sol";

contract QrCodeItem {
    function qrCodeStart(uint32 index) public {
        index = index;
        QRCode.scan(tvm.functionId(qrCodePrint));
    }

    function qrCodePrint(string value) public {
        Terminal.print(0x01, format("Recognized QR Code data:\n\n{}", value));
    }
}
