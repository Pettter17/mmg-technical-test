const supertest = require("supertest");
const app = require("../index");
class Helper {
    constructor() {
        this.apiServer = supertest(app);
    }
}

module.exports = Helper;