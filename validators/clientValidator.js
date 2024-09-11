const validator = require('validator');

/**
 * Validate client data.
 * @param {Object} clientData - The client data to be validated.
 * @returns {Array} - List of validation errors.
 */
const validateClientData = (clientData) => {
  const errors = [];
  const { clientName, password, confirmPassword, clientId, email, salary } = clientData;

  // Validate required fields
  if (!clientName || !password || !confirmPassword || !clientId || !email) {
    errors.push('Missing required fields');
  }

  // Validate clientName (must not be numeric)
  if (validator.isNumeric(clientName)) {
    errors.push('Client name cannot be numeric');
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    errors.push('Invalid email format');
  }

  // Validate password strength
  if (!validator.isLength(password, { min: 8 })) {
    errors.push('Password must be at least 8 characters long');
  }

  // Ensure password and confirm password match
  if (password !== confirmPassword) {
    errors.push('Password and confirm password do not match');
  }

  // Additional validations (e.g., salary)
  if (salary && typeof salary !== 'number') {
    errors.push('Salary must be a number');
  }

  return errors;
};

module.exports = {
  validateClientData,
};
