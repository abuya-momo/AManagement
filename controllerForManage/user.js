var User = require('../model/user');
var UserDevice = require('../model/userDevice');

// 获取用户设备信息
module.exports.user = function (req, res) {
  var param = req.query.param,
      paramType = req.query.paramType;

  var user = new User();

  var getUserInfo = function (userId) {
    user.getUserInfoById(userId, function (err, userInfo) {
      if (err) {
        res.send(err);
        return;
      }

      if (!userInfo) {
        res.json({
          user: {}
        });
        return;
      }

      var userDevice = new UserDevice();
      userDevice.getDevicesByUserId(userId, function (error, devices) {
        if (error) {
          res.send(error);
          return;
        }

        userInfo.binded_devices = devices;
        res.json({
          user: userInfo
        });
      });
    });
  }

  if (paramType == 'mi_id') {
    user.searchUserByMiID(param, function (error, userId) {
      if (error) {
        res.send(error);
        return;
      }

      if (userId == -1) {
        res.json({
          user: {}
        });
        return;
      } else {
        getUserInfo(userId);
      }
    });
  } else {
    getUserInfo(param);
  }
};
