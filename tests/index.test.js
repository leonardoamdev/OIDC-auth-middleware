const { expect } = require("chai");
const request = require("supertest");
const { app } = require("../index"); // Replace with the correct path to your app file

describe("Express App", () => {
  it('GET / should return "Welcome to the home page"', (done) => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal("Welcome to the home page");
        done();
      });
  });

  it("GET /profile should return a protected profile page", (done) => {
    request(app)
      .get("/profile")
      .expect(302) // Expect a redirection to /signin because it's protected
      .end((err, res) => {
        if (err) return done(err);
        // You can further test the authentication flow if needed
        done();
      });
  });
});
