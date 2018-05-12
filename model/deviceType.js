var db = require('../db'),
    moment = require('moment');
    pool = db.pool;

function DeviceType (id, model, type_name, type_profile, type_pic) {

}

// 获取设备类型列表
DeviceType.prototype.getDeviceTypeList = function (callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
      return;
    }

    connection.connect();
    connection.query('SELECT * FROM device_type', null, function (error, results, fields) {
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

// 根据设备类型id查询设备类型，如果没有找到则返回-1
DeviceType.prototype.findDeviceTypeById = function (id, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
      return;
    }

    connection.connect();
    connection.query('SELECT * FROM device_type WHERE id = ?', id, function (error, results, fields) {
      if (error) {
        callback(error);
        return;
      }

      if (results.length > 0) {
        callback(null, results[0]);
      } else {
        callback(null, -1);
      }

      connection.release();
    });
  });
}

// 添加设备类型[C]
DeviceType.prototype.addDeviceType = function (deviceType, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
    }

    connection.connect();
    console.log('deviceType: ' + deviceType);
    var sql = 'INSERT INTO device_type (model, type_name, type_profile, type_pic) VALUES (?, ?, ?, ?)';
    connection.query(
      sql,
      [deviceType.model, deviceType.type_name, deviceType.type_profile, deviceType.type_pic],
      function (error, results, fields) {
        if (error) {
          if (error.code == "ER_DUP_ENTRY") {
            callback("设备型号(英文)重复，添加失败", false);
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
};

// 修改设备类型[U]
DeviceType.prototype.editDeviceType = function (deviceType, id, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
      return;
    }

    connection.connect();
    var sql = 'UPDATE device_type SET model = ?, type_name = ?, type_profile = ?, type_pic = ? WHERE id = ?';
    connection.query(
      sql,
      [deviceType.model, deviceType.type_name, deviceType.type_profile, deviceType.type_pic, id],
      function (error, results, fields) {
        if (error) {
          if (error.code == "ER_DUP_ENTRY") {
            callback("设备型号(英文)重复，添加失败", false);
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

module.exports = DeviceType;
