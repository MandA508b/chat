const db= require('../db/db')

const schema = new db.Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    room:{
        type: String,
        required: true
    }
})

module.exports = db.model('chatUser', schema)