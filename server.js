var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Note = require('./api/models/noteModel'),
  bodyParser = require('body-parser'),
  Int32 = require('mongoose-int32');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Notedb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/noteRoutes'); //importing route
routes(app); //register the route

var server = app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

module.exports = server;

console.log('API server started on: ' + port);
