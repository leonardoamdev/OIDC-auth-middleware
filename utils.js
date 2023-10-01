const crypto = require("crypto");

function generateCodeVerifier() {
  const codeVerifier = crypto.randomBytes(32).toString("hex");
  return codeVerifier;
}
function calculateCodeChallenge(codeVerifier) {
  const codeChallenge = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return codeChallenge;
}
module.exports = {
  generateCodeVerifier,
  calculateCodeChallenge,
};
