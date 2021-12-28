const Query = {
  async messages(parent, {chatBoxId}, {db}, info){
    if(!chatBoxId){
        console.log("Missing chatBoxId when query messages")
        return
    }
    const chatBox = await ChatBoxModel.findById(chatBoxId)
    return Promise.all(
        chatBox.messages.map(
            (mId) => {
                console.log("here's mapping")
                return MessageModel.findById(mId)
            }
        )
    )
},
  async chatBox(parent, { name1, name2 }, { db }, info) {
    // if(!name1){
    //     console.log("Missing name1 when query chat box")
    //     return
    // }
    // if(!name2){
    //     console.log("Missing name2 when query chat box")
    //     return
    // }

    const chatBox = await ChatBoxModel.findOne({
      name: makeName(name1, name2),
    });

    return chatBox;
  },
};

export { Query as default };