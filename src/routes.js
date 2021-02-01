var basicAuth = require('./controller/basicAuth');
var userDAO = require('./controller/userDAO');
var shopDAO = require('./controller/shopDAO');

module.exports = function(app) {

    /**
     * Handles all request and validate the Basic Auth required
     */
    app.use(function(req, res, next) {
        basicAuth.validateUser(req, (validAuth) => {
            if (validAuth) {
                next();
            } else {
                res.status(401).send('Unauthorized');
            }
        });
    });

    /**
     * POST /users
     * Create a new user. Request body is validated
     */
    app.post('/users', function(req, res) {
        userDAO.validateUser(req.body, (error) => {
            if (error) {
                res.status(400).send("Bad request. Request body is no user");
            } else {
                userDAO.insertUser(req.body.name, req.body.password, req.body.role, (err) => {
                    if (err) {
                        res.status(500).send("Error creating the user")
                    } else {
                        res.status(200).send("User created");
                    }
                });
            }
        });
    });

    /**
     * POST /shops
     * Create a new coffee shop. Request body is validated
     */
    app.post('/shops', function(req, res) {
        shopDAO.validateShop(req.body, (error) => {
            if (error) {
                res.status(400).send("Bad request. Request body is no shop");
            } else {
                shopDAO.insertShop(req.body.name, req.body.location, req.body.nonCommentable, (err) => {
                    if (err) {
                        res.status(500).send("Error creating the shop")
                    } else {
                        res.status(200).send("Shop created");
                    }
                });
            }
        });
    });

    /**
     * GET /shops
     * Gets the information of all the coffee shops.
     */
    app.get('/shops', function(req, res) {
        // TODO
        res.send("Wello world");
    });

    /**
     * GET /shops/:shopid
     * Gets the information of the given cofee shop
     */
    app.get('/shops/:shopid', function(req, res) {
        // TODO
        res.send("Wello world");
    });

    /**
     * PUT /shops/:shopid/comment
     * Adds a comment to the given shopid coffee shop
     */
    app.put('/shops/:shopid/comment', function(req, res) {
        // TODO
        res.send("Wello world");
    });

}