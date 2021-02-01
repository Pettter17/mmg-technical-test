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
 * Returns true if user is admin, elsewhere false
 * @param {*} username Name of user
 * @param {*} callback error, isAdmin boolean
 */
module.exports.isAdminUser = function(username, callback) {
    let isAdmin = false;
    this.findByName(username, (error, user) => {
        if (error) callback(error);
        if (user && user.role == 1) {
            isAdmin = true;
        }
        callback(null, isAdmin);
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