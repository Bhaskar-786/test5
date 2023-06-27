const mongoose = require('mongoose')

const {Schema} = mongoose;

const UserSchema = new Schema({
    naam:{
        type: String,
        required:true
    },
    location:{
        type: String,
        required: true

    },
    email:{
        type: String,
        required: true

    },
    password:{
        type: String,
        required: true

    }   

});

module.exports = mongoose.model('users', UserSchema)