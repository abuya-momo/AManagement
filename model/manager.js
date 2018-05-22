var db = require('../db'),
    moment = require('moment');
    pool = db.pool;
var User = require('./user');

function Manager (id, slogan, brand_name, brand_icon, brand_description) {

}

// 获取管理员列表[RL]
Manager.prototype.getManagerList = function (callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
      return;
    }

    connection.connect();
    connection.query('SELECT * FROM manager', null, function (error, results, fields) {
      if (error) {
        callback(error);
        return;
      }

      if (results.length > 0) {
        callback(null, results);
      }

      connection.release();
    });
  });
}

// 根据管理员id查询管理员详情，如果没有找到则返回-1[R]
Manager.prototype.findManagerById = function (id, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
      return;
    }

    connection.connect();
    connection.query('SELECT * FROM brand WHERE id = ?', id, function (error, results, fields) {
      if (error) {
        callback(error);
        return;
      }

      if (results.length > 0) {
        connection.query('SELECT state FROM device_type WHERE brand = ?', id, function (error, states, fields) {
          if (error) {
            callback(error);
            return;
          }

          var result = results[0];
          result.states = states.map(function (item, index) {
            return item.state;
          });
          callback(null, result);

          connection.release();
        });
      } else {
        callback(null, -1);
      }
    });
  });
}

// 添加管理员[C]
Manager.prototype.addManager = function (manager, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
    }

    var user = new User();
    user.signUp(manager.name, manager.password, 12, function (signUpError, userId) {
      if (signUpError) {
        callback(signUpError);
      }

      connection.connect();
      var sql = 'INSERT INTO manager (user_id, brand, start_time) VALUES (?, ?, ?)';
      connection.query(
        sql,
        [userId, manager.brand, moment().format('YYYY-MM-DD HH:mm:ss')],
        function (error, results, fields) {
          if (error) {
            if (error.code == "ER_DUP_ENTRY") {
              callback("管理员名称和现有管理员重复，添加失败", false);
              return;
            }
            callback(error, false);
            return;
          }

          callback(null, true);
          connection.release();
        }
      );
    });
  });
};

// 修改管理员[U]
Manager.prototype.editManager = function (brand, id, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
      return;
    }

    connection.connect();
    var sql = 'UPDATE brand SET slogan = ?, brand_name = ?, brand_description = ?, brand_icon = ? WHERE id = ?';
    connection.query(
      sql,
      [brand.slogan, brand.brand_name, brand.brand_description, brand.brand_icon, id],
      function (error, results, fields) {
        if (error) {
          if (error.code == "ER_DUP_ENTRY") {
            callback("管理员名称和现有管理员重复，添加失败", false);
            return;
          }
          callback(error, false);
          return;
        }

        callback(null, true);
        connection.release();
    });
  });
};

// 注销管理员[U]
Manager.prototype.deleteManager = function (id, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
      return;
    }
    connection.connect();
    var sql = 'UPDATE manager SET if_deleted = 1, delete_time = ? WHERE id = ?';
    connection.query(
        sql,
        [moment().format('YYYY-MM-DD HH:mm:ss'), id],
        function (error, results, fields) {
          if (error) {
            callback(error, false);
            return;
          }

          callback(null, true);
          connection.release();
        });
  });
};


module.exports = Manager;
