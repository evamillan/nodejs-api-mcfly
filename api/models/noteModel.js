'use strict';
var mongoose = require('mongoose');
var NumberInt = require('mongoose-int32');

var Schema = mongoose.Schema;

var noteSchema = new Schema({
  text: {
    type: String,
    required: 'Required field'
  },
  favorite: {
    type: NumberInt,
    default: 0}
});

module.exports = mongoose.model('Notes', noteSchema);
