var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var multer = require('multer');
// var upload = multer({ dest: 'uploads/' });
// var upload = multer();

app.use(express.static('public'));
// app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

// 路由 -------------------------------------------------------------------------

app.get('/', function (req, res) {
  res.send('Hello World2333!hhh');
});

// 路由-后台管理 ---------------------------------------

// 路由-后台管理-设备类型
// 路由-后台管理-设备类型列表
app.get('/app/device_types', function (req, res) {
  console.log(Object.getOwnPropertyNames(req));
  console.log(req.params);
  res.send('device_type list');
});
// 路由-后台管理-添加设备类型
// app.post('/app/device_types', upload.array(), function (req, res) {
app.post('/app/device_types', function (req, res) {
  console.log(req.body);
  res.send('add new device_type');
});
// 路由-后台管理-修改设备类型
app.post('/app/device_types/', function (req, res) {
  res.send('device_type list');
});
// 路由-后台管理-删除设备类型
app.get('/app/device_types', function (req, res) {
  res.send('device_type list');
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
