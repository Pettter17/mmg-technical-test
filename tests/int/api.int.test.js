const Helper = require("../helper");
const helper = new Helper();


it("Get the list of shops", async() => {
    const { body } = await helper.apiServer.get("/shops").set('Authorization', "Basic YWRtaW46YWRtaW4=")
    expect(body).toHaveProperty("shops");
    expect(body.shops.length).toBeGreaterThan(0);
});


it("Unauthorized response", async() => {
    await helper.apiServer.get("/shops").expect(401)
});