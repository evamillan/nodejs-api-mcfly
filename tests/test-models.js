let expect = require('chai').expect;
let Note = require('../api/models/noteModel.js');

describe('note', function() {
    it('should be invalid if text is empty', function(done) {
        let n = new Note();

        n.validate(function(err) {
            expect(err.errors.text).to.exist;
            done();
        });
    });
});

describe('note', function() {
    it('should be invalid if user is empty', function(done) {
        let n = new Note();

        n.validate(function(err) {
            expect(err.errors.user).to.exist;
            done();
        });
    });
});
