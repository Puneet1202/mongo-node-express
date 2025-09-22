const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({

    path:{
        type: String,
        required: [true, "File path is required"]
    },
    originalName:{
        type: String,
        required: [true, "Original file name is required"]
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required"]
    }
})

const fileModel = mongoose.model('File', fileSchema);
module.exports = fileModel;


