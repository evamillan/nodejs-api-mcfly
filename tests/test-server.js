process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
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
