var DeviceType = require('../model/deviceType');

// 获取设备类型列表
module.exports.device_types = function (req, res) {
  var deviceType = new DeviceType();
  deviceType.getDeviceTypeList(function (error, deviceTypeList) {
    if (error) {
      res.send(error);
      return;
    }

    res.json({
      deviceTypes: deviceTypeList
    });
  });
}

// 获取设备类型详情
module.exports.device_type = function (req, res) {
  var deviceTypeId = req.query.id;
  var deviceType = new DeviceType();
  deviceType.findDeviceTypeById(deviceTypeId, function (error, deviceType) {
    if (error) {
      res.send(error);
      return;
    }

    res.json({
      deviceType: deviceType
    });
  });
};

// 添加设备类型
module.exports.add_device_type = function (req, res) {
  var deviceTypeParams = {
    model: req.body.model ? req.body.model : null,
    type_name: req.body.type_name ? req.body.type_name : null,
    type_profile: req.body.type_profile ? req.body.type_profile : null,
    type_pic: req.body.type_pic ? req.body.type_pic : null,
  };
  var deviceType = new DeviceType();
  deviceType.addDeviceType(deviceTypeParams, function (error, success) {
    if (error) {
      res.json({
        succcess: false,
        message: error
      });
      return;
    }

    res.json({
      succcess: success,
      message: ""
    });
  });
};

// 修改设备类型
module.exports.edit_device_type = function (req, res) {
  var deviceTypeParams = {
    model: req.body.model ? req.body.model : null,
    type_name: req.body.type_name ? req.body.type_name : null,
    type_profile: req.body.type_profile ? req.body.type_profile : null,
    type_pic: req.body.type_pic ? req.body.type_pic : null,
  };
  var deviceTypeId = req.body.id;
  var deviceType = new DeviceType();
  deviceType.editDeviceType(deviceTypeParams, deviceTypeId, function (error, success) {
    if (error) {
      res.json({
        succcess: false,
        message: error
      });
      return;
    }

    res.json({
      succcess: success,
      message: ""
    });
  });
};
