const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app'); 

chai.use(chaiHttp);

describe('Authentication API', () => {
  it('should register a new user', (done) => {
    chai.request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        designation: 'team member'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should log in a user', (done) => {
    chai.request(app)
      .post('/api/auth/login')
      .send({
        email: 'john@example.com',
        password: 'password123'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});
