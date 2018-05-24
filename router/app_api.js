var account = require('../controller/account');
var device = require('../controller/device');
var dayRecord = require('../controller/dayRecord');

// 应用端 ---------------------------------------
module.exports = function (app) {
  // 应用端 - 账户
  // 应用端 - 账户 - 判断是否注册
  app.get('/app_api/check_sign_up', account.check_sign_up);
  // 应用端 - 账户 - 绑定账号
  // app.post('/app_api/bind_account', account.bind_account);

  // 应用端 - 设备
  // 应用端 - 设备 - 绑定设备
  app.post('/app_api/bind_device', device.bind_device);
  // 应用端 - 设备 - 获取设备id和绑定状态(设备入网)
  app.post('/app_api/get_device_id', device.get_device_id);
  // 应用端 - 设备 - 获取设备列表
  app.get('/app_api/get_device_list', device.get_device_list);
  // 应用端 - 设备 - 解除绑定
  app.post('/app_api/unbind_device', device.unbind_device);
  // 应用端 - 设备 - 查看设备详情
  app.get('/app_api/device', device.get_device);

  // 应用端 - 步数
  // 应用端 - 步数 - 同步步数
  app.post('/app_api/sync_day_record', dayRecord.sync_day_record);
}
