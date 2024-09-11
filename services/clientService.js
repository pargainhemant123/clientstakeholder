const bcrypt = require('bcrypt');
const { Client } = require('../models'); // Import the Client model
const { validateClientData } = require('../validators/clientValidator'); // Import validation
const { generateToken } = require('../middlewares/authMiddleware'); // Import the generateToken function
const logger = require('../middlewares/logger'); // Import the Winston logger

const SALT_ROUNDS = 10; // Number of rounds for bcrypt hashing

/**
 * Create a new client.
 * @param {Object} clientData - The client data to be saved.
 * @returns {Promise<Client>} - The created client.
 */
const createClient = async (clientData) => {
  try {
    // Validate client data
    const errors = validateClientData(clientData);
    if (errors.length > 0) {
      const errorMessage = errors.join(', ');
      logger.error(`Validation failed: ${errorMessage}`);
      throw new Error(errorMessage);
    }

    const { password, clientName, clientId, email, salary } = clientData;

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create the client in the database
    const client = await Client.create({
      clientName,
      password: hashedPassword,
      clientId,
      email,
      salary
    });

    logger.info(`Client created successfully: ${clientId}`);
    return client;
  } catch (error) {
    logger.error(`Error creating client: ${error.message}`);
    throw new Error(`Error creating client: ${error.message}`);
  }
};

/**
 * Authenticate a client.
 * @param {Object} credentials - The client login credentials.
 * @returns {Promise<Object>} - The client and JWT token if authentication is successful.
 */
const authenticateClient = async (credentials) => {
  try {
    const { email, password } = credentials;
    // Check if the client exists
    const client = await Client.findOne({ where: { email } });
   
    if (!client) {
      logger.warn(`Authentication failed: Client not found for email ${email}`);
      throw new Error('Invalid email or password');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, client.password);

    if (!isPasswordValid) {
      logger.warn(`Authentication failed: Invalid password for email ${email}`);
      throw new Error('Invalid email or password');
    }

    // Generate a JWT token
    const token = generateToken({ id: client.id, email: client.email });

    logger.info(`Client authenticated successfully: ${client.id}`);
    return { client, token };
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    throw new Error(`Authentication error: ${error.message}`);
  }
};

/**
 * Get client details by ID.
 * @param {number} clientId - The ID of the client to retrieve.
 * @returns {Promise<Client|null>} - The client details or null if not found.
 */
const getClientById = async (clientId) => {
  try {
    logger.info(`Retrieving client by ID: ${clientId}`);
    const client = await Client.findByPk(clientId); // Find client by primary key (ID)
    
    if (!client) {
      logger.warn(`Client not found: ${clientId}`);
    }

    return client;
  } catch (error) {
    logger.error(`Error retrieving client: ${error.message}`);
    throw new Error(`Error retrieving client: ${error.message}`);
  }
};

module.exports = {
  createClient,
  authenticateClient,
  getClientById
};
