var db = require('../db'),
    pool = db.pool;

function User(id, name, password, mi_id, role) {
  this.id = id ? id : null;
  this.id = name ? name : null;
  this.id = password ? password : null;
  this.id = mi_id ? mi_id : null;
  this.id = role ? role : null;
}

// 管理端登录 返回角色和brandId
User.prototype.manageLogin = function (userId, password, callback) {
  pool.getConnection(function (err, connection) {
    connection.connect();
    connection.query('SELECT password FROM user WHERE id = ?', [userId], function (error, results, fields) {
      if (error) {
        callback({
          success: false,
          message: error
        });
        return;
      }

      console.log(results);

      if (results.length > 0) {
        if (results[0]['password'] == password) {
          connection.query('SELECT m.brand, u.role, u.name FROM user AS u, manager AS m WHERE u.id = ? AND u.id = m.id', userId, function (err, results, fields) {
            if (err) {
              callback({
                success: false,
                message: err
              });
              return;
            }

            if (results && results.length > 0) {
              callback({
                success: true,
                message: ''
              }, {
                role: results[0]['role'],
                brand: results[0]['brand'],
                name: results[0]['name'],
                id: userId
              });
            } else {
              callback({
                success: false,
                message: 'manager not exist'
              });
            }
          });
        } else {
          callback({
            success: false,
            message: err
          });
        }
      }
      else {
        console.log('wdfegsdrhf');
        callback({
          success: false,
          message: 'password wrong'
        });
      }

      connection.release();
    });
  });
};

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
User.prototype.signUp = function (name, password, role, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
    }

    connection.connect();
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
