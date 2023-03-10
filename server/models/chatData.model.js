const db= require('../db/db')

const schema = new db.Schema({
    chatName:{
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    messageText: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

module.exports = db.model('chatData', schema)
