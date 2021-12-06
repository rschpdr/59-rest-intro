const jwt = require("jsonwebtoken");

function generateToken(userObj) {
  const { _id, name, email } = userObj;

  const signature = process.env.TOKEN_SIGN_SECRET;
  const expiration = "2h";

  return jwt.sign({ _id, name, email }, signature, { expiresIn: expiration });
}

module.exports = generateToken;
