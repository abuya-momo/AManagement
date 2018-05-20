var db = require('../db'),
    moment = require('moment');
    pool = db.pool;

function UserDevice () {

}

// 根据设备ID获取设备历史绑定用户的信息[RL]
UserDevice.prototype.getUsersByDeviceId = function (deviceId, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
    }

    connection.connect();
    let sql = 'SELECT u.id, u.mi_id, u.name, du.bind_time, du.if_binding, du.unbind_time FROM user_device AS du, user AS u WHERE du.device_id = ? AND du.user_id = u.id';
    connection.query(sql, deviceId, function (error, results, fields) {
      if (error) {
        callback(error);
      }

      console.log('getUsersByDeviceId');
      console.log(results);

      if (results && results.length > 0) {
        callback(null, results);
      } else {
        callback(null, []);
      }

      connection.release();
    });
  });
};

// 根据用户ID获取设备历史绑定设备的信息[RL]
UserDevice.prototype.getDevicesByUserId = function (userId, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
    }

    connection.connect();
    let sql = 'SELECT id, device_id, bind_time, if_binding, unbind_time FROM user_device WHERE user_id = ?';
    connection.query(sql, userId, function (error, results, fields) {
      if (error) {
        callback(error);
      }

      console.log('model/userDevice/getDevicesByUserId');
      console.log(results);

      if (results && results.length > 0) {
        callback(null, results);
      } else {
        callback(null, []);
      }

      connection.release();
    });
  });
};

module.exports = UserDevice;
