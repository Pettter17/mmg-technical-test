"use strict";

const settings = require("./settings");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./src/routes");
var bodyParser = require('body-parser');

// Connects to MongoDB and starts express server
const init = async() => {
    await mongoose.connect(settings.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

    const server = express();

    server.use(bodyParser.json());

    routes(server);

    await server.listen(settings.port, () => {
        console.log(`Express server listening on port ${settings.port}`);
    });

};

mongoose.connection.on("error", err => {
    console.log("Error while connecting to MongoDB", err);
    process.exit(1);
})
mongoose.connection.on("connected", (err, res) => {
    console.log("Successfully connected to database");
})

process.on("unhandledRejection", err => {
    console.log("Unhandled error", err);
    process.exit(1);
});

init();