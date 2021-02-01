var userDAO = require('./userDAO');

/**
 * Returns true or false depending on if the auth is valid
 * @param {*} req express request object
 * @param {*} callback function with error and boolean result value
 */
module.exports.validateUser = function(req, callback) {
    let isValidAuth = false;

    // Decrypt the header value and gets the name and password of the user
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    // Check if the decrypted user matchs a database user
    userDAO.findByName(login, (error, user) => {
        if (error) throw error;
        if (user && user.password == password) {
            isValidAuth = true;
        }
        callback(isValidAuth);
    });
}