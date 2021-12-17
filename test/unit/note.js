/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

import Note from '../../src/repository/noteModel';
import app from '../../src/service';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Notes CRUD operations', () => {
  const DUMMY_ENTRY = {
    USER_ID: '20160313',
    NOTE_ID: '',
  };

  // Before run tests empty the database
  before((done) => {
    Note.deleteMany({}, () => {
      done();
    });
  });

  /*
  * Test the /POST route
  */
  describe('/POST Notes', () => {
    it(`it should POST new note with ID ${DUMMY_ENTRY.USER_ID}`, (done) => {
      chai.request(app)
        .post('/note')
        .send({
          userID: DUMMY_ENTRY.USER_ID,
          text: 'Dummy Test',
          label: 'CS',
        })
        .then((res) => {
          res.should.have.status(200);
          const note = res.body;
          // eslint-disable-next-line no-underscore-dangle
          DUMMY_ENTRY.NOTE_ID = note._id;
          note.should.be.a('object');
          note.should.have.property('userID').eql(DUMMY_ENTRY.USER_ID);
          note.should.have.property('text').eql('Dummy Test');
          note.should.have.property('label').eql('CS');
          done();
        })
        .catch((err) => done(err));
    });

    it(`it should POST new note with ID ${DUMMY_ENTRY.USER_ID} and add it with the previous one`, (done) => {
      chai.request(app)
        .post('/note')
        .send({
          userID: DUMMY_ENTRY.USER_ID,
          text: 'Some Important Test',
          label: 'IS',
        })
        .then((res) => {
          res.should.have.status(200);
          const note = res.body;
          note.should.be.a('object');
          note.should.have.property('userID').eql(DUMMY_ENTRY.USER_ID);
          note.should.have.property('text').eql('Some Important Test');
          note.should.have.property('label').eql('IS');
          done();
        })
        .catch((err) => done(err));
    });

    it('it should not POST new note without userID', (done) => {
      const note = {
        text: 'Some random text1',
      };
      chai.request(app)
        .post('/note')
        .send(note)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('userID');
          res.body.errors.should.not.have.property('text');
          res.body.errors.userID.should.have.property('kind').eql('required');
          done();
        });
    });

    it('it should not POST new note without text', (done) => {
      const note = {
        userID: DUMMY_ENTRY.USER_ID,
      };
      chai.request(app)
        .post('/note')
        .send(note)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('text');
          res.body.errors.should.not.have.property('userID');
          res.body.errors.text.should.have.property('kind').eql('required');
          done();
        });
    });
  });

  /*
  * Test the /GET route
  */
  describe('/GET note', () => {
    it(`it should GET all notes of user with id ${DUMMY_ENTRY.USER_ID} (2 Notes)`, (done) => {
      chai.request(app)
        .get(`/${DUMMY_ENTRY.USER_ID}/note`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array').to.have.lengthOf(2);
          done();
        });
    });
    it('it should GET note with the passed id', (done) => {
      chai.request(app)
        .get(`/note/${DUMMY_ENTRY.NOTE_ID}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  /*
  * Test the /PUT route
  */
  describe('/PUT note', () => {
    it('it should UPDATE the note with the passed id', (done) => {
      chai.request(app)
        .put(`/note/${DUMMY_ENTRY.NOTE_ID}`)
        .send({
          text: 'Some updated text',
          label: 'Some updated label',
        })
        .end((err, res) => {
          res.should.have.status(200);
          const note = res.body;
          note.should.be.a('object');
          note.should.have.property('userID').eql(DUMMY_ENTRY.USER_ID);
          note.should.have.property('text').eql('Some updated text');
          note.should.have.property('label').eql('Some updated label');
          done();
        });
    });
  });

  /*
  * Test the /DELETE route
  */
  describe('/DELETE note', () => {
    it('it should DELETE the note with the passed id', (done) => {
      chai.request(app)
        .delete(`/note/${DUMMY_ENTRY.NOTE_ID}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('deletedCount').eql(1);
          done();
        });
    });

    it(`it should now GET only one note of user with id ${DUMMY_ENTRY.USER_ID}`, (done) => {
      chai.request(app)
        .get(`/${DUMMY_ENTRY.USER_ID}/note`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array').to.have.lengthOf(1);
          done();
        });
    });
  });
});
