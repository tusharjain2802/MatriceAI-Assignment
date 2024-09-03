const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('Project API', () => {
    it('should create a new project', (done) => {
      chai.request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${yourJwtToken}`)
        .send({
          name: 'New Project',
          description: 'Project description',
          deadline: '2024-12-31',
          teamLeader: 'user_id',
          teamMembers: ['user_id_1', 'user_id_2']
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  
    it('should retrieve all projects', (done) => {
      chai.request(app)
        .get('/api/projects')
        .set('Authorization', `Bearer ${yourJwtToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
  