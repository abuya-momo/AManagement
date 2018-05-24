var DayRecord = require('../model/dayRecord');

module.exports.sync_day_record = function (req, res) {
  var userId = Number(req.body.userId),
      lastSyncTime = req.body.lastSyncTime,
      data = req.body.data;

  var dayRecord = new DayRecord();
  dayRecord.syncDayRecord(userId, lastSyncTime, data, function (error, success, data) {
    if (error) {
      res.json({
        success: false,
        message: error,
        data: null
      });
      return;
    }

    if (success) {
      res.json({
        success: true,
        message: null,
        data: data
      });
    } else {
      res.json({
        success: false,
        message: null,
        data: null
      });
    }
  });
}
