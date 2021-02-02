const server = require("express")();
const routes = require("./src/routes");
var bodyParser = require('body-parser');

server.use(bodyParser.json());

routes(server);

module.exports = server;