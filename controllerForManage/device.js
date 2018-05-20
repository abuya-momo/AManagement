var UserDevice = require('../model/userDevice');
var Device = require('../model/device');

// 根据特征值或者mac获取设备信息及绑定用户列表
module.exports.device = function (req, res) {
  var userDevice = new UserDevice();
  var device = new Device();
  var param = req.query.param;
  var paramType = req.query.paramType;
  var getDeviceInfo = function (deviceId) {
    device.getDevice(deviceId, function (getDeviceError, device) {
      if (getDeviceError) {
        res.send(getDeviceError);
        return;
      }

      userDevice.getUsersByDeviceId(deviceId, function (getUsersByDeviceIdError, users) {
        if (getUsersByDeviceIdError) {
          res.send(getUsersByDeviceIdError);
          return;
        }

        device.id = deviceId;
        res.json({
          device: device,
          users: users
        });
      });
    });
  }

  console.log('paramType' + paramType);
  console.log('param' + param);
  if (paramType == 'identifier_number') {
    console.log('use identifier_number');
    device.findDeviceIdByIdentifierNumber(param, function (deviceId, state) {
      getDeviceInfo(deviceId);
    });
  } else {
    console.log('use mac');
    device.findDeviceIdByMac(param, function (deviceId, state) {
      getDeviceInfo(deviceId);
    });
  }
}
