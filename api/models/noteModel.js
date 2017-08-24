'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
  text: {
    type: String,
    required: 'Required field'
  },
  favorite: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Notes', noteSchema);
