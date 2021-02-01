var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Schema for comments
var commentSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { _id: false });

// Schema for shops
var shopSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    nonCommentable: Boolean,
    comments: {
        type: [commentSchema],
    }
}, { collection: 'shops' });

//Export the schema  
module.exports = mongoose.model('Shop', shopSchema);