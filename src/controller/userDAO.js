//const ddbbConnection = require('./ddbb');
var User = require('../model/user');

/**
 * Inserts an user in MongoDB
 * @param {*} name 
 * @param {*} password 
 * @param {*} role 0 is client role, 1 is for admin
 */
module.exports.insertUser = function(name, password, role, callback) {
    var user = new User({ name: name, password: password, role: role || 0 });
    user.save(function(err) {
        if (err) callback(err);
        else callback();
    });
};

/**
 * Returns the list of users
 */
module.exports.getUsers = function() {
    User.find(function(error, users) {
        if (error) callback(error);
        callback(null, users);
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
 * Return error is user is invalid
 * @param {*} user 
 * @param {*} callback error
 */
module.exports.validateUser = function(user, callback) {
    if (user && user != {} && typeof user.name == "string" && typeof user.password == "string") {
        if (!user.role || (user.role != 1 && user.role != 0)) {
            // We set the default role to 0
            user.role = 0
        }
        callback()
    } else {
        callback("Invalid request body");
    }
}