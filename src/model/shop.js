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
});

// Schema for shops
var shopSchema = new Schema({
    name: {
        type: String,
        unique: true,
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