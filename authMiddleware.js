const session = require("express-session");

const passport = require("passport");
const OIDCStrategy = require("passport-openidconnect").Strategy;

// Configure the OIDC strategy
passport.use(
  "oidc",
  new OIDCStrategy(
    {
      issuer: "http://localhost:3000", // OIDC provider issuer URL
      clientID: "5pi0tac5vr6j4lgv648oi8u5n1utah20", // Your client ID
      clientSecret: "GOCASX-cI2V_uVu7ojw24GWHZKzGSwSTDpN", // Your client secret
      callbackURL: "http://localhost:5000/auth/callback/oidc", // Your app's callback URL
      passReqToCallback: true, // Pass the request object to the callback function
      authorizationURL: "http://localhost:3000/auth",
      tokenURL: "http://localhost:3000/token",
      scope: "openid profile email",
    },
    (req, tokenset, userinfo, done) => {
      // Handle authentication success
      // You can access user info from the `userinfo` object
      // Call `done` to indicate authentication is complete
      return done(null, userinfo);
    }
  )
);

// Serialize the authenticated user
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize the authenticated user
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Create the session middleware
const sessionMiddleware = session({
  secret: "your-session-secret", // Session secret (change this to a secure value)
  resave: false,
  saveUninitialized: false,
});

// Initialize passport and session middleware
const initializePassport = () => {
  return (req, res, next) => {
    sessionMiddleware(req, res, () => {
      passport.initialize()(req, res, () => {
        passport.session()(req, res, next);
      });
    });
  };
};

// Middleware to protect routes with OIDC authentication
const authenticateOIDC = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin"); // Redirect to login if not authenticated
};

module.exports = {
  initializePassport,
  authenticateOIDC,
};
