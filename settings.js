require("dotenv").config({ silent: true });

module.exports = {
    port: process.env.PORT || 3000,
    dbConnectionString: process.env.DB_CONNECTION || "mongodb://127.0.0.1:27017/"
};