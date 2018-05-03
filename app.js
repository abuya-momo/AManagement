var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var multer = require('multer');
// var upload = multer({ dest: 'uploads/' });
// var upload = multer();

var router_manage = require('./router/manage');

// use --------------------------------------------------------------------------
app.use(express.static('public'));
// app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

// database ---------------------------------------------------------------------
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'pzh',
  password : 'aco16532',
  database : 'shoes'
});

connection.connect();

connection.query('SELECT * from device', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0]);
});

connection.end();

// router -------------------------------------------------------------------------
app.get('/', function (req, res) {
  res.send('Hello World2333!hhh');
});

router_manage(app);

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://localhost:3001', host, port);
});
