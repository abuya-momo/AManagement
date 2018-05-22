var db = require('../db'),
    pool = db.pool;

function User(id, name, password, mi_id, role) {
  this.id = id ? id : null;
  this.id = name ? name : null;
  this.id = password ? password : null;
  this.id = mi_id ? mi_id : null;
  this.id = role ? role : null;
}

// 根据mi_id获取用户id
User.prototype.searchUserByMiID = function (mi_id, callback) {
  pool.getConnection(function (err, connection) {
    connection.connect();
    connection.query('SELECT id FROM user WHERE mi_id = ?', [mi_id], function (error, results, fields) {
      if (error) {
        return error;
      }

      if (results.length > 0) {
        callback(null, results[0]['id']);
      }
      else {
        callback(null, -1);
      }

      connection.release();
    });
  });
};

// 根据userId获取用户资料
User.prototype.getUserInfoById = function (id, callback) {
  pool.getConnection(function (err, connection) {
    connection.connect();
    connection.query('SELECT id, name, mi_id, role FROM user WHERE id = ?', [id], function (error, results, fields) {
      if (error) {
        return error;
      }

      if (results && results.length > 0) {
        callback(null, results[0]);
      }
      else {
        callback(null, null);
      }

      connection.release();
    });
  });
};

// 注册[C]
Device.prototype.signUp = function (name, password, role, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
    }

    connection.connect();
    console.log('deviceTypeId: ' + deviceTypeId);
    var sql = 'INSERT INTO user (name, password, role) VALUES (?, ?, ?)';
    connection.query(sql, [name, password, role], function (error, results, fields) {
      if (error) {
        callback(error);
      }

      callback(null, results['insertId']);

      connection.release();
    });
  });
};

module.exports = User;
