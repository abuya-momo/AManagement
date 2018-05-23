var User = require('../model/user');
var UserDevice = require('../model/userDevice');

// 管理端登录
module.exports.manage_login = function (req, res) {
  var userId = req.body.userId,
      password = req.body.password;

  var user = new User();
  user.manageLogin(userId, password, function (successMessage, authMessage) {
    if (successMessage.success) {
      res.json({
        success: true,
        message: "",
        role: authMessage.role,
        brand: authMessage.brand
      });
    } else {
      res.json({
        success: false,
        message: successMessage.message
      });
    }
  });
}

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
