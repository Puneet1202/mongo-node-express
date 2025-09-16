const mongooes = require("mongoose");

function connectDB(){
    mongooes.connect(process.env.MONGO_URL).then(()=>{
        console.log('database connected');
    }).catch((err)=>{
        console.log('error while connecting to database',err);
    })
}
module.exports = connectDB;