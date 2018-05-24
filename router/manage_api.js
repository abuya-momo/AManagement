var multer = require('multer');
var upload = multer({ dest: 'public/images' });
var deviceType = require('../controllerForManage/deviceType'),
    brand = require('../controllerForManage/brand'),
    device = require('../controllerForManage/device'),
    monitor = require('../controllerForManage/monitor'),
    user = require('../controllerForManage/user');
    manager = require('../controllerForManage/manager'),
    fileUpload = require('../controllerForManage/fileUpload');

// 路由 - 后台管理
module.exports = function (app) {
  // 路由-后台管理-设备类型 ---------------------------------------
  // 路由-后台管理-设备类型列表
  app.get('/manage/device_types', deviceType.device_types);
  // 路由-后台管理-设备类型详情
  app.get('/manage/device_type', deviceType.device_type);
  // 路由-后台管理-添加设备类型
  app.post('/manage/add_device_type', deviceType.add_device_type);
  // 路由-后台管理-修改设备类型
  app.post('/manage/edit_device_type', deviceType.edit_device_type);

  // app.post('/app/device_types', upload.array(), function (req, res) {

  // 路由-后台管理-设备 ---------------------------------------
  // 路由-后台管理-设备信息查询
  app.get('/manage/device', device.device);
  // 路由-后台管理-用户设备查询
  app.get('/manage/user', user.user);
  // 路由-后台管理-登录
  app.post('/manage/manage_login', user.manage_login);

  // 路由-后台管理-品牌 ---------------------------------------
  // 路由-后台管理-品牌列表
  app.get('/manage/brands', brand.brands);
  // 路由-后台管理-品牌详情
  app.get('/manage/brand', brand.brand);
  // 路由-后台管理-添加品牌
  app.post('/manage/add_brand', brand.add_brand);
  // 路由-后台管理-修改品牌
  app.post('/manage/edit_brand', brand.edit_brand);

  // 路由-后台管理-管理员管理 ---------------------------------------
  // 路由-后台管理-管理员列表
  app.get('/manage/managers', manager.managers);
  // 路由-后台管理-管理员详情
  app.get('/manage/manager', manager.manager);
  // 路由-后台管理-分配管理员
  app.post('/manage/add_manager', manager.add_manager);
  // 路由-后台管理-注销管理员
  app.post('/manage/delete_manager', manager.delete_manager);

  // 路由-后台管理-dashboard ---------------------------------------
  // 路由-后台管理-设备当前信息查询
  app.get('/manage/monitor', monitor.monitor);
  // 路由-后台管理-品牌/系列设备日活查询
  app.get('/manage/monitor_DAUs', monitor.monitor_DAUs);

  // 路由-后台管理-文件上传 ---------------------------------------
  // 路由-后台管理-上传图片
  app.post('/manage/upload_pic', upload.array('pic'), fileUpload.upload_pic);
};
