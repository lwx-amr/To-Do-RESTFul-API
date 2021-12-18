/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai from 'chai';
import debug from 'debug';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import app from '../../src/service';
import userModel from '../../src/repository/usersModel';

const authTestLogger = debug('app:test');
// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Authentication methods', () => {
  const DUMMY_ENTRY = {
    firstName: 'Amr',
    lastName: 'Hussien',
    email: 'amr.ister20@gmail',
    password: '123456aa',
    token: '',
  };

  // Clearing all users from the testing DB
  before((done) => {
    userModel.deleteMany(() => {
      done();
    });
  });

  describe('/POST user', () => {
    it('The request should be refused because the email is not valid', (done) => {
      chai.request(app)
        .post('/auth/user')
        .send(DUMMY_ENTRY)
        .end((err, res) => {
          authTestLogger(res.body);
          res.should.have.status(400);
          res.body.errors.should.have.property('email').have.property('message').eql('Invalid email format');
          done();
        });
    });

    it(`A new user with name ${`${DUMMY_ENTRY.firstName}  ${DUMMY_ENTRY.lastName}`} should be add to the DB`, (done) => {
      DUMMY_ENTRY.email = 'amr.ister20@gmail.com';
      chai.request(app)
        .post('/auth/user')
        .send(DUMMY_ENTRY)
        .end((err, res) => {
          authTestLogger(res.body);
          res.should.have.status(200);
          res.body.should.have.property('user').have.property('email').eql(DUMMY_ENTRY.email);
          done();
        });
    });

    it(`The request should be refused because the email "${DUMMY_ENTRY.email}" is used before`, (done) => {
      DUMMY_ENTRY.email = 'amr.ister20@gmail.com';
      chai.request(app)
        .post('/auth/user')
        .send(DUMMY_ENTRY)
        .end((err, res) => {
          authTestLogger(res.body);
          res.should.have.status(400);
          res.body.should.have.property('msg').eql('This email is used by another user');
          done();
        });
    });
  });

  describe('/POST token', () => {
    it('The request should be refused because password is not valid', (done) => {
      chai.request(app)
        .post('/auth/token')
        .send({
          email: DUMMY_ENTRY.email,
          password: '12345678',
        })
        .end((err, res) => {
          authTestLogger(res.body);
          res.should.have.status(400);
          res.body.should.have.property('msg').eql('Credentials are not valid');
          done();
        });
    });

    it('The request should be refused because email is not valid', (done) => {
      chai.request(app)
        .post('/auth/token')
        .send({
          email: 'amr@gmail.com',
          password: '123456aa',
        })
        .end((err, res) => {
          authTestLogger(res.body);
          res.should.have.status(400);
          res.body.should.have.property('msg').eql('Credentials are not valid');
          done();
        });
    });

    it('The request should be accepted as credentials valid', (done) => {
      chai.request(app)
        .post('/auth/token')
        .send({
          email: DUMMY_ENTRY.email,
          password: DUMMY_ENTRY.password,
        })
        .end((err, res) => {
          authTestLogger(res.body);
          res.should.have.status(200);
          res.body.should.have.property('token').and.not.to.be.empty;
          DUMMY_ENTRY.token = res.body.token;
          done();
        });
    });
  });

  describe('/DELETE token', () => {
    it('The request should be refused because token is not valid', (done) => {
      chai.request(app)
        .delete('/auth/token')
        .set('app-jwt', `${DUMMY_ENTRY.token}a`)
        .end((err, res) => {
          authTestLogger(res.body);
          res.should.have.status(400);
          res.body.should.have.property('msg').eql('Invalid token');
          done();
        });
    });

    it('The request should be accepted because token is valid', (done) => {
      chai.request(app)
        .delete('/auth/token')
        .set('app-jwt', DUMMY_ENTRY.token)
        .end((err, res) => {
          authTestLogger(res.body);
          res.should.have.status(200);
          res.body.should.have.property('msg').eql('Token removed successfully');
          done();
        });
    });
  });
});
