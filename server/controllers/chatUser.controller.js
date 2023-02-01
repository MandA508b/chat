const ChatUser = require('../models/chatUser.model')

class chatUserController{
    async addUser({id, name, room}){
        id = id.toString()
        if(!name || !room) {
            return {error: 'Username and room are required.'};
        }
        const existingUser = await ChatUser.findOne({room, name})

        if(existingUser) {
            existingUser.id = id
            await existingUser.save()

            return existingUser
        }
        const chatUser = await ChatUser.create({id, name, room})
        return chatUser
    }

    async removeUser(id){
        id = id.toString()
        const chatUser =await ChatUser.findByIdAndDelete({id})

        if(chatUser) return chatUser
    }

    async getUser(id) {
        id = id.toString()
        const chatUser = await ChatUser.findOne({id})
        return chatUser
    }

    async getUsersInRoom(room) {
        const chatUsers = await ChatUser.find({room})

        return chatUsers
    }
}

module.exports = new chatUserController();