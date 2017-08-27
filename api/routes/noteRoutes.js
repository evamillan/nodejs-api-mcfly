'use strict';
module.exports = function(app) {
  var notes = require('../controllers/noteController');

  app.route('/notes')
    .get(notes.list_all_notes)
    .post(notes.create_a_note);

  app.route('/notes/:noteId')
    .get(notes.read_a_note)
    .delete(notes.delete_a_note);

  app.route('/favorited')
    .get(notes.list_favorites);

  app.route('/favorited/:noteId')
    .put(notes.favorite_a_note);

  app.route('/user/:user')
    .get(notes.list_user_notes)
};
