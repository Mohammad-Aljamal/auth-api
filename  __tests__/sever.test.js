const supertest = require('supertest');
const {server} = require('../api-server/src/server');
const { db } = require("../api-server/src/models/index");
const request = supertest(server);
beforeAll(async () => {
    await db.sync();
  });
describe('Server Routes', () => {
  describe('Version 1 routes', () => {
    it('should get all records from a model', async () => {
      const response = await request.get('/api/v1/food');
      expect(response.status).toBe(200);
    });
  });
  
  // Test /api/v2 routes
//   describe('Version 2 routes', () => {
//     it('should get all records from a model with authentication and permissions', async () => {
//       // Set up authentication and permissions as needed for the test
//       const response = await request.get('/api/v2/food');
//       expect(response.status).toBe(200);
//     //   expect(response.body).toEqual(/* expected response body */);
//     });
//   });

  describe('Authentication routes', () => {
    it('should create a new user and return 201 status code', async () => {
      const user = {
        username: 'testuser',
        password: 'testpassword'
      };
      const response = await request.post('/signup').send(user);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
    });
  });
});
afterAll(async () => {
    await db.drop();
})