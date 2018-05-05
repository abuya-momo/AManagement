var account = require('../controller/account');
var device = require('../controller/device');

// 路由 - 应用端 ---------------------------------------
module.exports = function (app) {
  // 路由 - 应用端 - 账户
  // 路由 - 应用端 - 账户 - 判断是否注册
  app.get('/app_api/check_sign_up', account.check_sign_up);
  // 路由 - 应用端 - 账户 - 绑定账号
  // app.post('/app_api/bind_account', account.bind_account);

  // 路由 - 应用端 - 设备
  // 路由 - 应用端 - 绑定设备
  app.post('/app_api/bind_device', device.bind_device);
  // 路由 - 应用端 - 获取设备id和绑定状态(设备入网)
  app.post('/app_api/get_device_id', device.get_device_id);
}
