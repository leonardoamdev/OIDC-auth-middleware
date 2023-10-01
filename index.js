const express = require("express");
const passport = require("passport");
const { initializePassport, authenticateOIDC } = require("./authMiddleware");
const app = express();

// Middleware
app.use(express.json());
// Initialize Passport and session middleware
app.use(initializePassport());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

app.get("/signin/oidc", passport.authenticate("oidc"));
// Callback route after successful authentication
app.get(
  "/auth/callback/oidc",
  passport.authenticate("oidc", { successRedirect: "/profile" })
);

app.get("/signin", (req, res) => {
  res.send("signin page");
});

// Protected profile route
app.get("/profile", authenticateOIDC, (req, res) => {
  res.send(`Hello, ${req.user.name}! This is your profile page.`);
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

module.exports = { app };
