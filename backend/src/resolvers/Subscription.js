import { makeName } from "./utility";
const Subscription = {
    message: {
        async subscribe(parent, { chatBoxName }, { db, pubsub }, info) {
            const chatBox = await db.ChatBoxModel.findOne({name: chatBoxName});
            if (!chatBox) {
                throw new Error('chatBox not found');
            }
            return pubsub.asyncIterator(`chatBox ${chatBoxName}`);
        },
    },
    friend: {
        async subscribe(parent, { username1, username2 }, { db, pubsub }, info) {
            const User1 = await db.UserModel.findOne({username1});
            const User2 = await db.UserModel.findOne({username2});
            if (!User1) {
                throw new Error(`User ${username1} not found`);
            }
            if (!User2) {
                throw new Error(`User ${username2} not found`);
            }
            let chatboxname = makeName(username1, username2)
            return pubsub.asyncIterator(`User ${chatboxname}`);

        },
    },
};

export { Subscription as default };
