var deviceType = require('../controllerForManage/deviceType');
var device = require('../controllerForManage/device');
var user = require('../controllerForManage/user');

// 路由 - 后台管理 ---------------------------------------
module.exports = function (app) {
  // 路由-后台管理-设备类型
  // 路由-后台管理-设备类型列表
  app.get('/manage/device_types', deviceType.device_types);
  // 路由-后台管理-设备类型详情
  app.get('/manage/device_type', deviceType.device_type);
  // 路由-后台管理-添加设备类型
  app.post('/manage/add_device_type', deviceType.add_device_type);
  // 路由-后台管理-修改设备类型
  app.post('/manage/edit_device_type', deviceType.edit_device_type);

  // app.post('/app/device_types', upload.array(), function (req, res) {

  // 路由-后台管理-设备
  // 路由-后台管理-设备信息查询
  app.get('/manage/device', device.device);
  // 路由-后台管理-用户设备查询
  app.get('/manage/user', user.user);
};
