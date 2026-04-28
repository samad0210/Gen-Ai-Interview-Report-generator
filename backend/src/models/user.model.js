const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username already taken"],
        unique:true
    },

    email:{
        type:String,
        required:[true,"email already taken"],
        unique:true
    },

    password:{
        type:String,
        required:[true,"password is required"]
    }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;