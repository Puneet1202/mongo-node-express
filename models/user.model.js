const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim :  true,
        minLength:3,
        maxLength:30,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:6
    }
    
})

const  user = mongoose.model('user',userSchema);

module.exports = user;