var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World2333!hhh');
});

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://localhost:3001', host, port);
});

// database
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
