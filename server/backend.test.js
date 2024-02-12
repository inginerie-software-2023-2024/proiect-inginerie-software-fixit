import supertest from 'supertest';
import { app } from '../server/index.js';
import User from '../server/models/User.js';

const request = supertest(app);
let userId; // Variable to store the ID of the registered user

describe('Testing register route', function() {
  this.timeout(20000);

  afterEach(async function() { // Make the hook asynchronous
    if (userId) {
      try {
        await User.findByIdAndDelete(userId); // Use await to delete the user
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  });

  it('should register a user successfully', function(done) {
    const userData = {
      firstName: 'david623',
      lastName: 'david623',
      email: 'david6123@example.com',
      password: 'david6123123',
      friends: [],
      location: 'Somewhere',
      isClient: true
    };

    request.post('/auth/register')
      .send(userData)
      .expect(201)
      .end((err, response) => {
        if (err) return done(err);

        // Store the ID of the registered user for deletion later
        userId = response.body._id;

        if (!response.body._id || response.body.firstName !== userData.firstName || response.body.lastName !== userData.lastName || response.body.email !== userData.email) {
          return done(new Error('Response body does not contain the expected user data'));
        }

        done();
      });
  });

  describe('Testing login route', function() {
    it('should login a user successfully', function(done) {
      const loginCredentials = {
        email: 'david1@example.com',
        password: 'david1'
      };

      request.post('/auth/login')
        .send(loginCredentials)
        .expect(200)
        .end((err, response) => {
          if (err) return done(err);

          if (!response.body.token || !response.body.user) {
            return done(new Error('Response body does not contain token or user data'));
          }

          done();
        });
    });

    // Add more test cases if needed
  });

  // Add more test cases if needed
});
