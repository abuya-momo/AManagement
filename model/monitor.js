var db = require('../db'),
    moment = require('moment');
    pool = db.pool;

function Monitor (id, model, type_name, type_profile, type_pic) {

}

// 获取dashboard设备信息, 返回列表包含每个型号信息
Monitor.prototype.getBrandDeviceStateByBrandId = function (brandId, date, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
      return;
    }

    console.log('getBrandDeviceStateByBrandId brandId = ' + brandId);
    console.log('getBrandDeviceStateByBrandId date = ' + date);

    connection.connect();
    var sql = 'SELECT dt.state, m.device_type_id, m.active_user_number, m.inited_device_number, m.date FROM monitor AS m, device_type AS dt WHERE dt.brand = ? AND (m.date = ? OR m.date = ?) AND m.device_type_id = dt.id';
    connection.query(sql, [brandId, date, date - 86400], function (error, results, fields) {
      if (error) {
        callback(error);
        return;
      }

      if (results.length > 0) {
        callback(null, results);
      } else {
        callback(null, []);
      }

      connection.release();
    });
  });
}

// 根据日期范围获取dashboard设备日活
Monitor.prototype.getDAUByBrandIdAndTime = function (brandId, startDate, lastDate, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
      return;
    }

    console.log('getDAUByBrandIdAndTime startDate = ' + startDate);
    console.log('getDAUByBrandIdAndTime lastDate = ' + lastDate);

    connection.connect();
    var sql = 'SELECT m.* FROM monitor AS m, device_type AS dt WHERE m.device_type_id = dt.id AND dt.brand = ? AND (m.date BETWEEN ? AND ?)';
    connection.query(sql, [brandId, startDate, lastDate + 1], function (error, results, fields) {
      if (error) {
        callback(error);
        return;
      }

      if (results.length > 0) {
        callback(null, results);
      } else {
        callback(null, -1);
      }

      connection.release();
    });
  });
}

module.exports = Monitor;
