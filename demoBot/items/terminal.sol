pragma ton -solidity >=0.35.0;

import "../DeBot-IS-consortium/Menu/Menu.sol";
import "../DeBot-IS-consortium/Terminal/Terminal.sol";

contract TerminalItem {
    function terminalStart(uint32 index) public {
        index = index;
        Terminal.print(tvm.functionId(terminalMenu), "");
    }

    function terminalMenu() public {
        Menu.select("Interface 'Terminal'", "", [
            MenuItem("Print", "", tvm.functionId(terminalPrint)),
//            MenuItem("Printf", "", tvm.functionId(terminalPrintf)),
            MenuItem("Input", "", tvm.functionId(terminalInput)),
            MenuItem("Input Multiline", "", tvm.functionId(terminalInputMultiline)),
            MenuItem("Back", "", 0x02)
            ]);
    }

    function terminalInput(uint32 index) public {
        index = index;
        Terminal.input(tvm.functionId(terminalSetText), "Enter message:", false);
    }

    function terminalInputMultiline(uint32 index) public {
        index = index;
        Terminal.input(tvm.functionId(terminalSetText), "Enter message:", true);
    }

    function terminalSetText(string value) public {
        string result = format("You've written:\n\n{}", value);
        Terminal.print(tvm.functionId(terminalMenu), result);
    }

    function terminalPrint(uint32 index) public {
        index = index;
        Terminal.print(tvm.functionId(terminalMenu), "Terminal print message.");
    }

//    function terminalPrintf(uint32 index) public {
//        index = index;
//        TvmBuilder b;
//        b.store(int8(1), uint32(10));
//        Terminal.printf(tvm.functionId(terminalMenu), "Enter number between {int8} and {uint32}", b.toCell());
//    }
}
