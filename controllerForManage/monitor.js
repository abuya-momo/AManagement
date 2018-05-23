var Monitor = require('../model/monitor');

// 获取dashboard设备当前信息
module.exports.monitor = function (req, res) {
  var brandId = req.query.brandId,
      date = req.query.date;
  var monitor = new Monitor();
  monitor.getBrandDeviceStateByBrandId(brandId, date, function (error, state) {
    if (error) {
      res.send(error);
      return;
    }

    res.json({
      state: state
    });
  });
}

// 根据日期范围获取dashboard设备日活
module.exports.monitor_DAUs = function (req, res) {
  var brandId = req.query.brandId,
      startDate = req.query.startDate,
      lastDate = req.query.lastDate;
  var monitor = new Monitor();
  monitor.getDAUByBrandIdAndTime(brandId, startDate, lastDate, function (error, DAUs) {
    if (error) {
      res.send(error);
      return;
    }

    res.json({
      DAUs: DAUs
    });
  });
};
