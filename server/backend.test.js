import supertest from 'supertest';
import { app } from '../server/index.js';
import User from '../server/models/User.js';

const request = supertest(app);

describe('Testing register route', () => {
  it('should register a user successfully', async () => {
    // Define dummy user data for registration
    const userData = {
      firstName: 'david2',
      lastName: 'david2',
      email: 'david2@example.com',
      password: 'david2',
      friends: [],
      location: 'Somewhere',
      isClient: true
    };

    // Make a POST request to register the user
    const response = await request.post('/auth/register').send(userData);

    // Check if the response status is 201
    if (response.status !== 201) {
      throw new Error(`Expected status 201 but received ${response.status}`);
    }

    // Check if the response body contains the saved user data
    if (!response.body._id || response.body.firstName !== userData.firstName || response.body.lastName !== userData.lastName || response.body.email !== userData.email) {
      
      throw new Error('Response body does not contain the expected user data');
    }

    // Optional: Check if the response body contains other expected user data
    // Add more assertions as necessary
  });

  describe('Testing login route', () => {
    it('should login a user successfully', async () => {
      // Define login credentials
      const loginCredentials = {
        email: 'david1@example.com',
        password: 'david1'
      };
  
      // Make a POST request to login with the credentials
      const response = await request.post('/auth/login').send(loginCredentials);
  
      // Check if the response status is 200
      if (response.status !== 200) {
        throw new Error(`Expected status 200 but received ${response.status}`);
      }
  
      // Check if the response body contains a token and user data
      if (!response.body.token || !response.body.user) {
        throw new Error('Response body does not contain token or user data');
      }
  
      // Additional assertions can be added as needed
    });
  
    // Add more test cases if needed
  });

  // Add more test cases if needed
});