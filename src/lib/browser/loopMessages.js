import ifc from "@/lib/browser/interface";

const DEBOT_WC = '-31';

export default async function loopMessages(Tab, epoch) {
  if (Tab.isMessagesLooping) {
    return;
  }
  Tab.isMessagesLooping = true;
  while (Tab.messages.length > 0) {
    if (Tab.epoch === epoch) {
      const message = Tab.messages.shift();
      try {
        const msg = (await Tab.client.boc.parse_message({boc: message.message})).parsed;
        const [dstWc, id] = msg.dst.split(':');
        if (DEBOT_WC === dstWc) {
          const Element = await ifc.call(Tab, id, msg, epoch);
          if (null !== Element) {
            Tab.addElement(Element, epoch);
          }
        } else {
          Tab.loading = true;
          const debotAddress = msg.dst;
          if (Tab.currentDebotAddress !== debotAddress) {
            Tab.messages.unshift(message)
            Tab.isMessagesLooping = false;
            Tab.switchDebot(debotAddress, epoch);
            return;
          } else {
            const debot = Tab.debots[debotAddress];
            await Tab.engine.send({debot_handle: debot.debot.debot_handle, message: message.message});
            const newMessages = debot.callbacks.messages.splice(0, debot.callbacks.messages.length);
            Tab.messages.push(...newMessages);
          }
        }
      } catch (e) {
        await Tab.fatal(e, epoch);
      } finally {
        Tab.loading = false;
      }
    } else {
      return;
    }
  }
  Tab.isMessagesLooping = false;
}
