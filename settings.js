require("dotenv").config({ silent: true });

module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
    dbConnectionString: process.env.DB_CONNECTION || "mongodb://127.0.0.1:27017/",

    // Environment-dependent settings
    development: {
        db: {
            dialect: "sqlite",
            storage: ":memory:"
        }
    },
    production: {
        db: {
            dialect: "sqlite",
            storage: "db/database.sqlite"
        }
    }
};