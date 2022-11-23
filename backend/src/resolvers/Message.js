const Message = {
    async sender(parent, args, {db}, info) {
        return await db.UserModel.findById(parent.sender); 
    }
};
  
export default Message;