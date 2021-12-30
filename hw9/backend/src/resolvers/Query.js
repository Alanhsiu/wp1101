import { ChatBoxModel, MessageModel, UserModel } from "../db";
import { makeName } from "./utility";

const Query = {

  async chatBox(parent, { name1, name2 }, { db }, info) {
    // if(!name1||!name2)
    //   return ChatBoxModel.findOne();
    const chatBox = await ChatBoxModel.findOne({
      name: makeName(name1, name2),
    });
    console.log(chatBox);
    return Promise.all(
      chatBox.messages.map((mId) => {
        return MessageModel.findById(mId);
      })
    );
  },
};

export { Query as default };
