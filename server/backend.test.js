import supertest from 'supertest';
import { app } from '../server/index.js';
import User from '../server/models/User.js';

const request = supertest(app);

describe('Testing register route', () => {
  this.timeout(20000);
  it('should register a user successfully', (done) => { // Change test function to use traditional callback style
    // Define dummy user data for registration
    const userData = {
      firstName: 'david4',
      lastName: 'david4',
      email: 'david4@example.com',
      password: 'david4',
      friends: [],
      location: 'Somewhere',
      isClient: true
    };

    // Make a POST request to register the user
    request.post('/auth/register')
      .send(userData)
      .expect(201) // Assert response status
      .end((err, response) => { // Callback function to handle response
        if (err) return done(err); // Pass any error to done() to fail the test

        // Check if the response body contains the saved user data
        if (!response.body._id || response.body.firstName !== userData.firstName || response.body.lastName !== userData.lastName || response.body.email !== userData.email) {
          return done(new Error('Response body does not contain the expected user data')); // Fail the test with an error
        }

        // Optionally, call done() without arguments to indicate success
        done();
      });
  });

  describe('Testing login route', () => {
    it('should login a user successfully', (done) => { // Change test function to use traditional callback style
      // Define login credentials
      const loginCredentials = {
        email: 'david1@example.com',
        password: 'david1'
      };

      // Make a POST request to login with the credentials
      request.post('/auth/login')
        .send(loginCredentials)
        .expect(200) // Assert response status
        .end((err, response) => { // Callback function to handle response
          if (err) return done(err); // Pass any error to done() to fail the test

          // Check if the response body contains a token and user data
          if (!response.body.token || !response.body.user) {
            return done(new Error('Response body does not contain token or user data')); // Fail the test with an error
          }

          // Optionally, call done() without arguments to indicate success
          done();
        });
    });

    // Add more test cases if needed
  });

  // Add more test cases if needed
});
