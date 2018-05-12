var db = require('../db'),
    moment = require('moment');
    pool = db.pool;

function Device (id, device_type, count, start_time, mac, state) {

}

// 绑定设备[U, C]
Device.prototype.bindDeviceAndUser = function (deviceId, userId, callback) {
  pool.getConnection(function (err, connection) {
    connection.connect();
    connection.query('SELECT state FROM device WHERE id = ?', [deviceId], function (error, results, fields) {
      if (error) {
        return error;
      }

      if (results.length > 0) {
        if (results[0]['state'] == 31) {
          connection.query('UPDATE device SET state = 32 WHERE id = ?', [deviceId], function (error, results, fields) {
            if (error) {
              return connection.rollback(function() {
                throw error;
              });
            }

            var sql = 'INSERT INTO user_device (user_id, device_id, bind_time, if_binding) VALUES (?, ?, ?, ?)';
            var nowTime = moment().format('YYYY-MM-DD HH:mm:ss')
            connection.query(sql, [userId, deviceId, nowTime, true], function (error, results, fields) {
              if (error) {
                connection.rollback(function() {
                  callback(false, error);
                  throw error;
                });
              }

              connection.commit(function(err) {
                if (err) {
                  return connection.rollback(function() {
                    throw err;
                  });
                }
                callback(true);
              });
            });
          });
        } else if (results[0]['state'] == 32) {
          callback(false, "This device is binding with another user.");
        }
      }
      else {
        callback(false, "No this device.");
      }

      connection.release();
    });
  });
};

// 根据序列号查找设备id以及绑定状态，如果没有返回-1[R]
Device.prototype.findDeviceIdByIdentifierNumber = function (identifierNumber, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
    }

    connection.connect();
    connection.query('SELECT id, state FROM device WHERE identifier_number = ?', identifierNumber, function (error, results, fields) {
      if (error) {
        callback(error);
      }

      if (results.length > 0) {
        callback(results[0]['id'], results[0]['state']);
      } else {
        callback(-1);
      }

      connection.release();
    });
  });
};

// 设备入网[C]
Device.prototype.initDevice = function (identifierNumber, mac, deviceTypeId, startTime, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
    }

    connection.connect();
    console.log('deviceTypeId: ' + deviceTypeId);
    var sql = 'INSERT INTO device (identifier_number, device_type, mac, start_time, count, state) VALUES (?, ?, ?, ?, 0, 31)';
    connection.query(sql, [identifierNumber, deviceTypeId, mac, startTime], function (error, results, fields) {
      if (error) {
        callback(error);
      }

      callback(null, results['insertId']);

      connection.release();
    });
  });
};

// 根据型号查询型号id，如果没有找到则返回-1[R]
Device.prototype.findDeviceTypeIdByModel = function (model, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
    }

    connection.connect();
    connection.query('SELECT id FROM device_type WHERE model = ?', [model], function (error, results, fields) {
      if (error) {
        callback(error);
      }

      if (results.length > 0) {
        callback(results[0]['id']);
      } else {
        callback(-1);
      }

      connection.release();
    });
  });
};

// 获取设备列表[RL]
Device.prototype.getDeviceList = function (userId, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
    }

    connection.connect();
    console.log('userId: ' + userId);
    var sql = 'SELECT ud.device_id, ud.if_binding, d.mac, dt.model FROM user_device AS ud, device AS d, device_type AS dt WHERE ud.user_id = ? AND d.device_type = dt.id AND ud.device_id = d.id';
    connection.query(sql, userId, function (error, results, fields) {
      if (error) {
        callback(error);
      }

      console.log(results);
      results.forEach(function (item, index) {
        results[index]['if_binding'] = results[index]['if_binding'] == 1 ? true : false;
      });

      if (results.length > 0) {
        callback(null, results);
      } else {
        callback(null, []);
      }

      connection.release();
    });
  });
};

// 解除绑定[U]
Device.prototype.unbindDevice = function (userId, deviceId, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
    }

    connection.connect();
    console.log('deviceId: ' + deviceId);
    console.log('userId: ' + userId);

    var sql = 'UPDATE user_device SET if_binding = 0 WHERE device_id = ? AND user_id = ?';
    connection.query(sql, [deviceId, userId], function (error, results, fields) {
      if (error) {
        connection.rollback(function() {
          throw error;
        });
        callback(error, false);
        return;
      }

      var sql = 'UPDATE device SET state = 31 WHERE id = ?';
      connection.query(sql, deviceId, function (error, results, fields) {
        if (error) {
          connection.rollback(function() {
            callback(false, error);
            throw error;
          });
          callback(error, false);
          return;
        }

        connection.commit(function(err) {
          if (err) {
            connection.rollback(function() {
              throw err;
            });
            callback(error, false);
            return;
          }
          callback(null, true);
          connection.release();
          return;
        });
      });
    });
  });
};

// 获取设备详情[R]
Device.prototype.getDevice = function (id, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
    }

    connection.connect();
    connection.query('SELECT d.count, d.start_time, d.mac, d.state, dt.model, dt.type_name, dt.type_profile, dt.type_pic FROM device AS d, device_type AS dt WHERE d.id = ? AND d.device_type = dt.id', id, function (error, results, fields) {
      if (error) {
        callback(error);
      }

      console.log(results);

      if (results.length > 0) {
        callback(null, results[0]);
      } else {
        callback(null, []);
      }

      connection.release();
    });
  });
};

module.exports = Device;
