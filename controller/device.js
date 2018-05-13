var Device = require('../model/device');

// 绑定设备
module.exports.bind_device = function (req, res) {
  console.log(req.body);

  var deviceId = req.body.deviceId;
  var userId = req.body.userId;

  var device = new Device();
  device.bindDeviceAndUser(deviceId, userId, function (success, message) {
    var response = {
      success: null,
      message: null
    };

    if (!success) {
      response.success = false;
      response.message = message;
    } else {
      response.success = true;
    }

    res.json(response);
  });
}

module.exports.get_device_id = function (req, res) {
  console.log(req.body);

  var identifierNumber = req.body.identifierNumber,
      mac = req.body.mac,
      model = req.body.model,
      startTime = req.body.startTime;

  var device = new Device();
  device.findDeviceIdByIdentifierNumber(identifierNumber, function (id, state) {
    if (id == -1) {// 新建设备记录
      device.findDeviceTypeIdByModel(model, function (device_id) {
        if (device_id == -1) {
          res.send('This model is not supported.');
          return;
        }

        device.initDevice(identifierNumber, mac, device_id, startTime, function (err, id) {
          if (err) {
            res.send(err);
          }

          res.json({
            "ifInit": true,
            "deviceId": id,
            "state": 31
          });
        });
      });
    } else {// 之前已入网
      res.json({
        "ifInit": false,
        "deviceId": id,
        "state": state
      });
    }
  });
}

// 获取设备列表
module.exports.get_device_list = function (req, res) {
  console.log(req.query);

  var userId = req.query.userId;

  if (!userId) {
    res.json({
      deviceList: [],
      error: "no param of userId"
    });
    return;
  }

  var device = new Device();
  device.getDeviceList(userId, function (error, deviceList) {
    if (error) {
      console.log(error);
      res.send(error);
      return;
    }

    var response = {
      deviceList: deviceList
    };

    res.json(response);
  });
}

// 解除绑定
module.exports.unbind_device = function (req, res) {
  console.log(req.body);

  var userId = req.body.userId;
  var deviceId = req.body.deviceId;

  var device = new Device();
  device.unbindDevice(userId, deviceId, function (error, success) {
    if (error) {
      console.log(error);
      res.send(error);
      return;
    }

    var response = {
      success: success ? true : false,
      message: ""
    };

    res.json(response);
  });
}

// 获取设备详情
module.exports.get_device = function (req, res) {
  console.log(req.query);

  var deviceId = req.query.id;

  var device = new Device();
  device.getDevice(deviceId, function (error, device) {
    if (error) {
      console.log(error);
      res.send(error);
      return;
    }

    var response = {
      device: device
    };

    res.json(response);
  });
}
