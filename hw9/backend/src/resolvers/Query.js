import { ChatBoxModel, MessageModel, UserModel } from "../db";
import { makeName } from "./utility";
import ChatBox from "./ChatBox";

const Query = {
  async chatBox(parent, { name1, name2 }, { db }, info) {
    const chatBox = await ChatBoxModel.findOne({
      name: makeName(name1, name2),
    });
    // Promise.all(chatBox.messages.map((mId) => db.MessageModel.findById(mId)));

    const msg = await ChatBoxModel.findById(chatBox._id.str);
    // return Promise.all(
    //     chatBox.messages.map(
    //         (mId) => {
    //             console.log("here's mapping")
    //             return MessageModel.findById(mId)
    //         }
    //     )
    // )
    chatBox.message += msg;
    return chatBox;
  },
};

export { Query as default };
