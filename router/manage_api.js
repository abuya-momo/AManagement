var deviceType = require('../controllerForManage/deviceType'),
    brand = require('../controllerForManage/brand'),
    device = require('../controllerForManage/device'),
    user = require('../controllerForManage/user');
    manager = require('../controllerForManage/manager');

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

  // 路由-后台管理-品牌
  // 路由-后台管理-品牌列表
  app.get('/manage/brands', brand.brands);
  // 路由-后台管理-品牌详情
  app.get('/manage/brand', brand.brand);
  // 路由-后台管理-添加品牌
  app.post('/manage/add-brand', brand.add_brand);
  // 路由-后台管理-修改品牌
  app.post('/manage/edit-brand', brand.edit_brand);

  // 路由-后台管理-管理员管理
  // 路由-后台管理-管理员列表
  app.get('/manage/manager-list', manager.managers);
  // 路由-后台管理-分配管理员
  app.get('/manage/add-manager', manager.add_manager);
  // 路由-后台管理-注销管理员
  app.post('/manage/delete-manager', manager.delete_manager);
};
