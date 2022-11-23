const makeName = (name1, name2) => {
    return [name1, name2].sort().join('_');
};

const checkUser = (db, username, errFunc) => {
    if(!username) 
        throw new Error('Missing user name for ' + errFunc);
    return db.UserModel.findOne({username});
};

const checkMessage = async (db, from, to, errFunc) => {
    const chatBoxName = makeName(from, to);
    return{
        chatBox: await checkChatBox(db, chatBoxName, errFunc),
        sender: await checkUser(db, from, errFunc),
        receiver: await checkUser(db, to, errFunc)
    }
}

const checkChatBox = (db, chatBoxName, errFunc) => {
    if(!chatBoxName) 
        throw new Error('Missing chatBox name for ' + errFunc);
    return db.ChatBoxModel.findOne({name: chatBoxName});
};

const checkRelationship = async (db,name1,name2) => {
    let user1 = await db.UserModel.findOne({name: name1})
    return user1.friends.includes(name2)

}

const newUser = (db, username, hashedpassword) => {
    return new db.UserModel({username, hashedpassword,friends:[],lastmsg:[],content:"",
        title:"",texture:"",art1:"",art2:"",art3:""}).save();
}

const newFriend = async(db, {username,friendname}) => {
    let tmp = await db.UserModel.findOne({username})
    tmp.friends.push(friendname)
    tmp.save()
    return
}
const updatelastmsg = async(db,user1,user2,msgtoupgdate) => {
    let User1 = await db.UserModel.findOne({username:user1})
    let User2 = await db.UserModel.findOne({username:user2})
    User1.lastmsg[User1.friends.indexOf(user2)] = msgtoupgdate
    User2.lastmsg[User2.friends.indexOf(user1)] = msgtoupgdate
    User1.save()
    User2.save()
    return
}
const newMessage = (db, sender, body) => {
    let timestamp = new Date()
    return new db.MessageModel({sender, body, timestamp}).save();
}

const newChatBox = (db, chatBoxName) => {
    return new db.ChatBoxModel({name: chatBoxName}).save();
}

export{
    makeName,
    checkUser,
    checkMessage,
    checkChatBox,
    checkRelationship,
    newUser,
    newFriend,
    newMessage,
    newChatBox,
    updatelastmsg
}