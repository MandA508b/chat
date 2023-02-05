const ChatData = require('../models/chatData.model')

class chatDataController{
    async addMessage(chatName, userName, messageText){
        const date = (new Date(Date.now()+60*2*60*1000)).toString()
        return await ChatData.create({chatName, userName, messageText, date})
    }

    async getAllMessageByChatName(chatName){
        const messages = await ChatData.find({chatName})

        return messages
    }
}

module.exports = new chatDataController();
