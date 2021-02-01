//const ddbbConnection = require('./ddbb');
var Shop = require('../model/shop');

/**
 * Inserts a shop in MongoDB
 * @param {*} name 
 * @param {*} password 
 * @param {*} role 0 is client role, 1 is for admin
 */
module.exports.insertShop = function(name, location, nonCommentable, callback) {
    var shop = new Shop({ name: name, location: location, nonCommentable: nonCommentable || false, comments: [] });
    shop.save(function(err) {
        if (err) callback(err);
        else callback();
    });
};

/**
 * Returns the list of shops
 */
module.exports.getShops = function() {
    Shop.find(function(error, shops) {
        if (error) callback(error);
        callback(null, shops);
    });
};


/**
 * Return a single user that matchs the name provided
 * @param {*} name 
 * @param {*} callback error, user found
 */
module.exports.findByName = function(name, callback) {
    User.findOne({ name: name }, function(error, user) {
        if (error) callback(error);
        callback(null, user);
    });
}

/**
 * Return error is shop is invalid
 * @param {*} shop 
 * @param {*} callback error
 */
module.exports.validateShop = function(shop, callback) {
    if (shop && shop != {} && typeof shop.name == "string" && typeof shop.location == "string") {
        if (!shop.nonCommentable || (shop.nonCommentable != true && shop.nonCommentable != false)) {
            // We set the default shop to commentable
            shop.nonCommentable = false
        }
        callback()
    } else {
        callback("Invalid request body");
    }

}