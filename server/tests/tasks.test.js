const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('Task API', () => {
    it('should create a new task', (done) => {
      chai.request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${yourJwtToken}`)
        .send({
          name: 'New Task',
          description: 'Task description',
          deadline: '2024-12-31',
          project: 'project_id',
          assignedTo: ['user_id_1', 'user_id_2']
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  
    it('should retrieve all tasks', (done) => {
      chai.request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${yourJwtToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
  