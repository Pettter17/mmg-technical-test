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
module.exports.getShops = function(callback) {
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
    Shop.findOne({ name: name }, function(error, shop) {
        if (error) callback(error);
        callback(null, shop);
    });
}

/**
 * Return a single user that matchs the id provided
 * @param {*} id 
 * @param {*} callback error, user found
 */
module.exports.findById = function(id, callback) {
    Shop.findOne({ _id: id }, function(error, shop) {
        if (error) callback(error);
        callback(null, shop);
    });
}

/**
 * Update a shop by inserting a comment
 * @param {*} shopName
 * @param {*} userName
 * @param {*} comment 
 * @param {*} callback error
 */
module.exports.insertComment = function(shopName, userName, comment, callback) {
    Shop.findOneAndUpdate({ _id: shopName }, { $push: { comments: { user: userName, comment: comment } } }, function(error, shop) {
        if (error) callback(error);
        callback(null, shop);
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