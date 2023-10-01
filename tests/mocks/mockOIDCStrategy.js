const { Strategy } = require("passport-strategy");

class MockOIDCStrategy extends Strategy {
  constructor(verify) {
    super();
    this.name = "oidc";
    this.verify = verify;
  }

  authenticate(req, options) {
    const self = this;

    function verified(err, user, info) {
      if (err) {
        return self.error(err);
      }
      if (!user) {
        return self.fail(info);
      }
      self.success(user, info);
    }

    this.verify(req, verified);
  }
}

module.exports = MockOIDCStrategy;
