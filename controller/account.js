var User = require('../model/user');

// 根据Mi_id检查是否存在账户，如果存在返回id
module.exports.check_sign_up = function (req, res) {
  console.log(req.query);
  console.log(Object.getOwnPropertyNames(req));

  var miId = req.query.miId;

  var user = new User();
  user.searchUserByMiID(miId, function (id) {
    var response = {
      ifSignUp: null,
      id: null
    };

    if (id === -1) {
      response.ifSignUp = false;
    } else {
      response.ifSignUp = true;
      response.id = id;
    }

    res.json(response);
  });
}

module.exports.bind_account = function (req, res) {

}
