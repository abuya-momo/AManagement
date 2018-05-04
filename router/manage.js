// 路由 - 后台管理 ---------------------------------------
module.exports = function (app) {
  // 路由-后台管理-设备类型
  // 路由-后台管理-设备类型列表
  app.get('/manage/device_types', function (req, res) {
    console.log(Object.getOwnPropertyNames(req));
    console.log(req.params);
    res.send('device_type list');
  });
  // 路由-后台管理-添加设备类型
  // app.post('/app/device_types', upload.array(), function (req, res) {
  app.post('/manage/device_types', function (req, res) {
    console.log(req.body);
    res.send('add new device_type');
  });
  // 路由-后台管理-修改设备类型
  app.post('/manage/device_types/', function (req, res) {
    res.send('device_type list');
  });
  // 路由-后台管理-删除设备类型
  app.get('/manage/device_types', function (req, res) {
    res.send('device_type list');
  });
};
