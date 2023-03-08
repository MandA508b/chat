const db = require('mongoose')

main().catch(err => console.log(err))

async function main(){
    await db.connect(`mongodb+srv://alex12012023:${process.env.password}@alex12012023.nhkqchh.mongodb.net/?retryWrites=true&w=majority`)
}

main();

module.exports = db;
