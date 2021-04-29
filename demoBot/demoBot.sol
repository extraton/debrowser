pragma ton -solidity >=0.35.0;
pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;

import "./Debot.sol";
import "./DeBot-IS-consortium/Menu/Menu.sol";
import "./items/terminal.sol";
import "./items/qrCode.sol";
import "./items/addressInput.sol";
import "./items/amountInput.sol";
import "./items/numberInput.sol";
import "./items/confirmInput.sol";

contract DemoBot is Debot, TerminalItem, QrCodeItem, AddressInputItem, AmountInputItem, NumberInputItem, ConfirmInputItem {
    bytes m_icon;

    function setIcon(bytes icon) public {
        require(msg.pubkey() == tvm.pubkey(), 100);
        tvm.accept();
        m_icon = icon;
    }

    function start() public functionID(0x01) override {
        Menu.select("Hello, I'm the Interfaces Demo Bot!\nWhich one interface you would like to see?", "", [
            MenuItem("Terminal", "Simple input/output", tvm.functionId(terminalStart)),
            MenuItem("QR Code", "Allows to scan qrcode and return its data as string", tvm.functionId(qrCodeStart)),
            MenuItem("Menu", "Interface for menu", tvm.functionId(toStartFromMenu)),
            MenuItem("Address Input", "Allows to input smart contract address", tvm.functionId(addressInputStart)),
            MenuItem("Amount Input", "Interface for amount input", tvm.functionId(amountInputStart)),
            MenuItem("Number Input", "Interface for number input", tvm.functionId(numberInputStart)),
            MenuItem("Confirm Input", "Interface for confirm input", tvm.functionId(confirmInputStart))
            ]);
    }

    function toStartFromMenu(uint32 index) public functionID(0x02) {
        index = index;
        Terminal.print(0x01, "");
    }

    function getDebotInfo() public functionID(0xDEB) override view returns (
        string name, string version, string publisher, string key, string author,
        address support, string hello, string language, string dabi, bytes icon
    ) {
        name = "Interfaces Demo";
        version = "0.1.0";
        publisher = "extraTON";
        key = "Start develop DeBot from here";
        author = "extraTON";
        support = address.makeAddrStd(0, 0x0);
        hello = "Hello, I'm the Interfaces Demo DeBot.";
        language = "en";
        dabi = m_debotAbi.get();
        icon = m_icon;
    }

    function getRequiredInterfaces() public view override returns (uint256[] interfaces) {
    }
}
