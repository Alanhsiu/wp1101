import { makeName } from "./utility";
import ChatBox from "./ChatBox";

const Query = {
  async chatBox(parent, { name1, name2 }, { db, pubsub }, info) {
    const chatBox = await db.ChatBoxModel.findOne({
      name: makeName(name1, name2),
    });
    if (!chatBox) throw new Error("chatBox not found");
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
