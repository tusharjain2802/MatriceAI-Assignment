const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('Deadline API', () => {
    it('should retrieve project deadlines', (done) => {
      chai.request(app)
        .get('/api/deadlines/projects')
        .set('Authorization', `Bearer ${yourJwtToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  
    it('should retrieve task deadlines by project', (done) => {
      chai.request(app)
        .get('/api/deadlines/tasks/project_id')
        .set('Authorization', `Bearer ${yourJwtToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
  