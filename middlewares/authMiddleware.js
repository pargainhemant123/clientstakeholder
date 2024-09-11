const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your actual secret key

/**
 * Middleware to authenticate JWT token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get the token from the 'Authorization' header

  if (token == null) {
    return res.sendStatus(401); // Unauthorized if no token is provided
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if the token is invalid
    }

    req.user = user; // Attach user information to request object
    next(); // Proceed to the next middleware or route handler
  });
};

/**
 * Function to generate a JWT token.
 * @param {Object} payload - The payload to include in the token.
 * @returns {string} - The generated JWT token.
 */
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
  authenticateJWT,
  generateToken,
};
