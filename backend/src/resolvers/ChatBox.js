const ChatBox = {
  messages(parent, args, { db }, info) {
    return Promise.all(
      parent.messages.map(
        (mId) => db.MessageModel.findById(mId))
    );
  },
};

export { ChatBox as default };