var db = require('../db'),
    moment = require('moment');
    pool = db.pool;

function DayRecord (id, userId, stepNumber, walk_state, date, sync_time) {

}

// 同步日记录[未判断重复]
DayRecord.prototype.syncDayRecord = function (userId, lastSyncTime, data, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
    }

    connection.connect();
    connection.query('SELECT * FROM day_record WHERE sync_time > ? AND user_id = ?', [lastSyncTime, userId], function (error, results, fields) {
      if (error) {
        callback(error);
      }

      if (results.length > 0) {
        insertDayRecord.dataUnSynced = results;
      }

      var syncTime = moment().format('X');
      console.log(syncTime);
      insertDayRecord.syncTime = syncTime;

      insertDayRecord.callback = callback;
      insertDayRecord.userId = userId;

      if (!data) {
        data = {
          data: []
        };
      } else {
        data = JSON.parse(data);
      }

      insertDayRecord(connection, data.data, 0);

      connection.release();
    });
  });
}

function insertDayRecord (connection, data, i) {
  if (!data[i]) {
    var dataUnSynced = insertDayRecord.dataUnSynced;
    insertDayRecord.syncTime = null;
    insertDayRecord.userId = null;
    insertDayRecord.dataUnSynced = null;
    insertDayRecord.callback(null, true, dataUnSynced);
    return;
  }

  var dataArr = [insertDayRecord.userId, data[i].stepNumber, data[i].time, data[i].walkState, data[i].date, insertDayRecord.syncTime];
  connection.query(insertDayRecord.sql, dataArr, function (err, results, fields) {
    if (err) {
      insertDayRecord.callback(err);
    }

    insertDayRecord(connection, data, i+1);
  });
}
insertDayRecord.sql = 'INSERT INTO day_record (user_id, step_number, time, walk_state, date, sync_time) VALUES (?, ?, ? ,?, ?, ?)';

module.exports = DayRecord;
