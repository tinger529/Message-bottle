import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LetterSchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, ref: "User" },
  content: {type: String, required: true},
  title: {type: String, required: true},
  texture: {type: String, required: true},
  attr1: {type: String, required: true},
  attr2: {type: String, required: true},
  attr3: {type: String, required: true},
});

const UserSchema = new Schema({
  username: { type: String, required: true },
  hashedpassword: { type: String, required: true },
  //friends: [{ type: mongoose.Types.ObjectId, ref: "Friend" }],
  friends: [{ type: String, required: true }],
  lastmsg : [{ type: mongoose.Types.ObjectId, ref: "Message" }],
  // title : { type: String, required: true },
  // texture : { type: String, required: true },
  // art : { type: String, required: true },
  content: String,
  title: String,
  texture: String,
  art1: String,
  art2: String,
  art3: String,
});

// const FriendSchema = new Schema({
//   friendname: { type: String, required: true },
//   lastmsg: [{ type: mongoose.Types.ObjectId, ref: "Message" }]
// })
const ChatBoxSchema = new Schema({
  name: { type: String, required: true },
  messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});

const MessageSchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, ref: "User" },
  body: { type: String, required: true },
  timestamp: {type: String, required: true},
});

//const FriendModel = mongoose.model("Friend", FriendSchema); 
const UserModel = mongoose.model("User", UserSchema);
const ChatBoxModel = mongoose.model("ChatBox", ChatBoxSchema);
const MessageModel = mongoose.model("Message", MessageSchema);
const LetterModel = mongoose.model("Letter", LetterSchema);

export {UserModel, ChatBoxModel, MessageModel, LetterModel}//,FriendModel};