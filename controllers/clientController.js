const clientService = require('../services/clientService');

/**
 * Handle client signup.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const signupClient = async (req, res) => {
  try {
    const clientData = req.body;

    // Call the service to create a new client
    const newClient = await clientService.createClient(clientData);

    // Respond with the newly created client
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Handle client login.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const loginClient = async (req, res) => {
  try {
    const credentials = req.body;

    // Call the service to authenticate the client
    const { client, token } = await clientService.authenticateClient(credentials);

    // Respond with the client and JWT token
    res.status(200).json({ client, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Handle retrieval of the authenticated client's profile.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getProfile = async (req, res) => {
    try {
      const clientId = req.query.id; // Access the client ID from the request
      const client = await clientService.getClientById(req.params.id);
      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }
      res.status(200).json({ client });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    signupClient,
    loginClient,
    getProfile,
  };

