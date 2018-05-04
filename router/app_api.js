var account = require('../controller/account');

// 路由 - 应用端 ---------------------------------------
module.exports = function (app) {
  // 路由 - 应用端 - 账户
  // 路由 - 应用端 - 账户 - 判断是否注册
  app.get('/app_api/check_sign_up', account.check_sign_up);
  // 路由 - 应用端 - 账户 - 绑定账号
  app.post('/app_api/bind_account', account.bind_account);
}
