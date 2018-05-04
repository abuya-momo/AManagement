var mysql = require('mysql');

const config = {
  host     : 'localhost',
  user     : 'pzh',
  password : 'aco16532',
  database : 'shoes'
};

const poolConfig = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'pzh',
  password: 'aco16532',
  database: 'shoes'
};

module.exports.config = config;

module.exports.pool = mysql.createPool(poolConfig);

// database ---------------------------------------------------------------------
// var mysql = require('mysql');
// var connection = mysql.createConnection();
//
// app.set('connection', connection);
//
// connection.connect();
// connection.query('SELECT * from device', function(err, rows, fields) {
//   if (err) throw err;
//   console.log('The solution is: ', rows[0]);
// });
// connection.end();
