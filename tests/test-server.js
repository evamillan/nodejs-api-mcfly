process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let NumberInt = require('mongoose-int32');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../server.js');
let Note = require('../api/models/noteModel.js');

chai.use(chaiHttp);

describe('Notes', () => {
    beforeEach((done) => {
        Note.remove({}, (err) => {
           done();
        });
    });

  describe('/GET notes', () => {
      it('it should GET all the notes', (done) => {
        chai.request(server)
            .get('/notes')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});

describe('/POST note', () => {
    it('it should not POST a note without text field', (done) => {
      let note = {user: "test user"}
      chai.request(server)
          .post('/notes')
          .send(note)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('text');
            done();
          });
    });
    it('it should not POST a note without user field', (done) => {
      let note = {text: "test text"}
      chai.request(server)
          .post('/notes')
          .send(note)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('user');
            done();
          });
    });
    it('it should POST a note', (done) => {
      let note = {
        text: "test text",
        user: "test user"
      };
      chai.request(server)
          .post('/notes')
          .send(note)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('text');
              res.body.should.have.property('user');
              res.body.should.have.property('favorite');
            done();
          });
    });
});

describe('/GET/:id note', () => {
     it('it should GET a note by the given id', (done) => {
       let note =  new Note({
         text: "test text",
         user: "test user"
       });
       note.save((err, note) => {
          chai.request(server)
            .get('/notes/' + note.id)
            .send(note)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('_id').eql(note.id);
            done();
       });
     });
     });
});

describe('/DELETE/:id note', () => {
     it('it should DELETE a note by the given id', (done) => {
       let note =  new Note({
         text: "test text",
         user: "test user"
       });
       note.save((err, note) => {
          chai.request(server)
            .delete('/notes/' + note.id)
            .send(note)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Note successfully deleted');
            done();
       });
     });
     });
});

describe('/GET favorited notes', () => {
     it('it should GET a list of favorited notes', (done) => {
       let note =  new Note({
         text: "test text",
         user: "test user",
         favorite: 1
       });
       note.save((err, note) => {
          chai.request(server)
            .get('/favorited')
            .end((err, res) => {
              res.should.have.status(200);
              for(let value of res.body){
                value.should.be.a('object');
                value.should.have.property('favorite').eql(note.favorite)
              };
            done();
       });
     });
     });
});

describe('/PUT/favorited/:id note', () => {
     it('it should mark a note as favorite', (done) => {
       let note =  new Note({
         text: "test text",
         user: "test user"
       });
       note.save((err, note) => {
          chai.request(server)
            .put('/favorited/' + note.id)
            .send(note)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('favorite').eql(1);
            done();
       });
     });
     });
});

describe('/GET/:user', () => {
     it("it should GET all of a user's notes", (done) => {
       let note =  new Note({
         text: "test text",
         user: "test user"
       });
       note.save((err, note) => {
          chai.request(server)
            .get('/user/' + note.user)
            .send(note)
            .end((err, res) => {
              res.should.have.status(200);
              for(let value of res.body){
                value.should.be.a('object');
                value.should.have.property('user').eql(note.user);
              }
            done();
       });
     });
     });
});
