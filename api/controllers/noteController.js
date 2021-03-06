'use strict';

var mongoose = require('mongoose'),
  Note = mongoose.model('Notes');

exports.list_all_notes = function(req, res) {
  Note.find({}, function(err, note) {
    if (err)
      res.send(err);
    res.json(note);
  });
};

exports.create_a_note = function(req, res) {
  var new_note = new Note({
    text: req.body.text,
    user: req.body.user
  });
  new_note.save(function(err, note) {
    if (err)
      res.send(err);
    res.json(note);
  });
};

exports.read_a_note = function(req, res) {
  Note.findById(req.params.noteId, function(err, note) {
    if (err)
      res.send(err);
    res.json(note);
  });
};

exports.favorite_a_note = function(req, res) {
  Note.findOneAndUpdate(
    {_id: req.params.noteId},
    {$bit:
      {favorite:
        {xor: 1}}},
    {new: true},
    function(err, note) {
      if (err)
        res.send(err);
        res.json(note);
      });
};

exports.delete_a_note = function(req, res) {
  Note.remove({
    _id: req.params.noteId
  }, function(err, note) {
    if (err)
      res.send(err);
    res.json({ message: 'Note successfully deleted' });
  });
};

exports.list_favorites = function(req, res) {
  Note.find({favorite: 1}, function(err, note) {
    if (err)
      res.send(err);
    res.json(note);
  });
};

exports.list_user_notes = function(req, res) {
  Note.find({user: req.params.user}, function(err, note) {
    if (err)
      res.send(err);
    res.json(note);
  });
};
