import { makeName, checkChatBox } from "./utility";
import ChatBox from "./ChatBox";

const Query = {
  async chatBox(parent, { name1, name2 }, { db, pubsub }, info) {
    const chatBoxName = makeName(name1, name2);
    let chatBox = await checkChatBox(db, chatBoxName, "queryChatBox");
    if (!chatBox) {
      throw new Error(`ChatBox ${chatBoxName} is not exist.`);
    }
    return chatBox;
  },
};

export { Query as default };

// Promise.all(chatBox.messages.map((mId) => db.MessageModel.findById(mId)));

// const msg = await ChatBoxModel.findById(chatBox._id.str);
// return Promise.all(
//     chatBox.messages.map(
//         (mId) => {
//             console.log("here's mapping")
//             return MessageModel.findById(mId)
//         }
//     )
// )
// chatBox.message += msg;
