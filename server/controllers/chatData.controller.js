const ChatData = require('../models/chatData.model')

class chatDataController{
    async addMessage(chatName, userName, messageText){
        await ChatData.create({chatName, userName, messageText})
    }

    async getAllMessageByChatName(chatName){
        const messages = await ChatData.find({chatName})

        return messages
    }
}

module.exports = new chatDataController();