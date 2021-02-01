var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Schema for users
var userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: Number
}, { collection: 'users' });

//Export the schema  
module.exports = mongoose.model('User', userSchema);