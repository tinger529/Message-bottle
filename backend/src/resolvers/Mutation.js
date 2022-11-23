import uuidv4 from 'uuid/v4';
import bcrypt from "bcrypt";
import crypto from "crypto-js";
import { makeName, checkUser, checkChatBox, newChatBox, checkMessage, checkRelationship, newMessage, newUser,newFriend,updatelastmsg} from './utility';

const saltRounds = 10
const Mutation = {
    async login(parent, {username, password}, {db, pubsub}, info){
        if(!password) 
            return  {status: 'Failed', message: 'Password cannot be empty'};
        const user = await checkUser(db, username, "login");
        if(!user) 
            return {status: 'Failed', message: `username ${username} doesn't exist`};
        //const inputPassword = crypto.AES.decrypt(password, secretKey).toString(crypto.enc.Utf8);
        //const passwordIsCorrect =  await bcrypt.compare(inputPassword, user.password);
        if(await bcrypt.compare(password, user.hashedpassword)){
            return {status: 'Success', message: 'Login Success'};
        }else{
            return {status: 'Failed', message: 'Password is incorrect'};
        }
    },
    async signUp(parent, {username, password}, {db, pubsub}, info){
        if(!password) 
            return {status: 'Failed', message: 'Password cannot be empty'};
        const user = await checkUser(db, username, "signUp");
        if(user)
            return {status: 'Failed', message: 'username exists'};
        else{
            const hashedpassword = await bcrypt.hash(password, saltRounds)
            await newUser(db, username, hashedpassword);
            return {status: 'Success', message: 'User created'};
        }
    },
    async createChatBox(parent, {name1, name2}, {db, pubsub}, info){
        if(!name1 || !name2)
            throw new Error("Missing chatBox name for CreateChatBox");
        if(!(await checkUser(db, name1, "createChatBox"))) 
            throw new Error(`username ${name1} doesn't exist`);
        if(!(await checkUser(db, name2, "createChatBox"))) 
            return {response: {status: 'Failed', message: `user ${name2} does not exist`}};

      
        const chatBoxName = makeName(name1, name2);
        let chatBox = await checkChatBox(db, chatBoxName, "createChatBox");
        if(!chatBox) 
            chatBox = await newChatBox(db, chatBoxName);
        return {response: {status: 'Success', message: 'ChatBox created'}, chatBox};

    },
    async createMessage(parent, {from, to, message}, {db, pubsub}, info){
        const {chatBox, sender, receiver} = await checkMessage(db, from, to, 'createMessage');

        if(!chatBox)
            throw new Error("chatBox not found for createMessage");
        if(!sender)
            throw new Error("username not found: " + from);
      
        const chatBoxName = makeName(from, to);
        const newMsg = await newMessage(db, sender, message);
        await chatBox.messages.push(newMsg._id);
        await chatBox.save();

        await updatelastmsg(db,from,to, newMsg)
        

        pubsub.publish(`chatBox ${chatBoxName}`, {
            message: {mutation: 'CREATED', message: newMsg}
        })

        pubsub.publish(`User ${chatBoxName}`, {
            friend: {mutation: 'CREATED',  lastmag: newMsg}
        })
        return {response: {status: 'Success', message: 'Message sent'}, message: newMsg};
    },
    async createletter(parent, {username}, {db, pubsub}, info){
        const user = await checkUser(db, username, "createletter")
        if(!user.content || !user.title || !user.tex || !user.art1 || !user.art2 || !user.art3){
            await new db.LetterModel({content: user.content,
                sender:user,
                title: user.title,
                texture: user.texture,
                attr1: user.art1,
                attr2: user.art2,
                attr3: user.art3,}).save();
                user.content = "";user.title = "";user.texture = "";user.art1 = "";user.art2 = "";user.art3 = "";
                user.save()
            return {status: 'Success', message: `letter: ${user.title} is created`}
        }
        
        return {status: 'Failed', message: `You seem to miss some of the attributes.`}    
        
    },
    async makefriend(parent, {name1, name2}, {db, pubsub}, info){
        if(!name1 || !name2)
            throw new Error("Missing chatBox name for CreateChatBox");
        if(!(await checkUser(db, name1, "createChatBox"))) 
            return {status: 'Failed', message: `user ${name1} does not exist`};
        if(!(await checkUser(db, name2, "createChatBox"))) 
            return {status: 'Failed', message: `user ${name2} does not exist`};
        if(await checkRelationship(db,name1, name2))
            return {status: 'Failed', message: `${name1} and ${name2} are already been friends!!!`};
        await newFriend(db,{username: name1, friendname: name2})
        await newFriend(db,{username: name2, friendname: name1})
        
        return {status: 'Success', message: `${name1} and ${name2} are friends now`};
    
    },
    async saveattribute(parent, {username, content, title, tex, art1, art2, art3}, {db, pubsub}, info){
        const user = await checkUser(db, username, "signUp");
        if(content)
            user.content = content
        if(title)
            user.title = title
        if(tex)
            user.texture = tex
        if(art1)
            user.art1 = art1
        if(art2)
            user.art2 = art2
        if(art3)
            user.art3 = art3
        await user.save()
        console.log(user)
        return {status: 'Success', message: `save attributes : ${user.title}, ${user.texture} and ${user.art1} successfully`};
    }
};

export { Mutation as default };
