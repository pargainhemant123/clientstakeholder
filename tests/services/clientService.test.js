// tests/services/clientService.test.js
const bcrypt = require('bcrypt');
const { Client } = require('../../models'); // Adjust path if needed
const { validateClientData } = require('../../validators/clientValidator'); // Adjust path if needed
const { generateToken } = require('../../middlewares/authMiddleware'); // Adjust path if needed
const { createClient, authenticateClient, getClientById } = require('../../services/clientService'); // Adjust path if needed

jest.mock('bcrypt');
jest.mock('../../models');
jest.mock('../../validators/clientValidator');
jest.mock('../../middlewares/authMiddleware');

describe('Client Service Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createClient', () => {
    it('should create a new client successfully', async () => {
      const clientData = {
        clientName: 'Test Client',
        password: 'password123',
        clientId: 'client123',
        email: 'test@example.com',
        salary: 1000
      };

      validateClientData.mockReturnValue([]);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      Client.create.mockResolvedValue(clientData);

      const result = await createClient(clientData);

      expect(validateClientData).toHaveBeenCalledWith(clientData);
      expect(bcrypt.hash).toHaveBeenCalledWith(clientData.password, 10);
      expect(Client.create).toHaveBeenCalledWith({
        clientName: clientData.clientName,
        password: 'hashedPassword',
        clientId: clientData.clientId,
        email: clientData.email,
        salary: clientData.salary
      });
      expect(result).toEqual(clientData);
    });

    it('should throw an error if validation fails', async () => {
      validateClientData.mockReturnValue(['Invalid data']);

      const clientData = {
        clientName: 'Test Client',
        password: 'password123',
        clientId: 'client123',
        email: 'test@example.com',
        salary: 1000
      };

      await expect(createClient(clientData)).rejects.toThrow('Invalid data');
    });

    it('should throw an error if creating client fails', async () => {
      const clientData = {
        clientName: 'Test Client',
        password: 'password123',
        clientId: 'client123',
        email: 'test@example.com',
        salary: 1000
      };

      validateClientData.mockReturnValue([]);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      Client.create.mockRejectedValue(new Error('Database error'));

      await expect(createClient(clientData)).rejects.toThrow('Error creating client: Database error');
    });
  });

  describe('authenticateClient', () => {
    it('should authenticate a client successfully and return a token', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' };
      const client = { id: 1, email: 'test@example.com', password: 'hashedPassword' };

      Client.findOne.mockResolvedValue(client);
      bcrypt.compare.mockResolvedValue(true);
      generateToken.mockReturnValue('jwtToken');

      const result = await authenticateClient(credentials);

      expect(Client.findOne).toHaveBeenCalledWith({ where: { email: credentials.email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(credentials.password, client.password);
      expect(generateToken).toHaveBeenCalledWith({ id: client.id, email: client.email });
      expect(result).toEqual({ client, token: 'jwtToken' });
    });

    it('should throw an error if the email is not found', async () => {
      const credentials = { email: 'nonexistent@example.com', password: 'password123' };

      Client.findOne.mockResolvedValue(null);

      await expect(authenticateClient(credentials)).rejects.toThrow('Invalid email or password');
    });

    it('should throw an error if the password is invalid', async () => {
      const credentials = { email: 'test@example.com', password: 'wrongPassword' };
      const client = { id: 1, email: 'test@example.com', password: 'hashedPassword' };

      Client.findOne.mockResolvedValue(client);
      bcrypt.compare.mockResolvedValue(false);

      await expect(authenticateClient(credentials)).rejects.toThrow('Invalid email or password');
    });
  });

  describe('getClientById', () => {
    it('should retrieve a client by ID successfully', async () => {
      const clientId = 1;
      const client = { id: clientId, clientName: 'Test Client' };

      Client.findByPk.mockResolvedValue(client);

      const result = await getClientById(clientId);

      expect(Client.findByPk).toHaveBeenCalledWith(clientId);
      expect(result).toEqual(client);
    });

    it('should throw an error if retrieving client fails', async () => {
      const clientId = 1;

      Client.findByPk.mockRejectedValue(new Error('Database error'));

      await expect(getClientById(clientId)).rejects.toThrow('Error retrieving client: Database error');
    });
  });
});
