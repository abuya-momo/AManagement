var Manager = require('../model/manager');

// 获取管理员列表[Document edit]
module.exports.managers = function (req, res) {
  var manager = new Manager();
  manager.getManagerList(function (error, managerList) {
    if (error) {
      res.send(error);
      return;
    }

    res.json({
      managers: managerList
    });
  });
}

// 获取管理员详情
module.exports.manager = function (req, res) {
  var managerId = req.query.id;
  var manager = new Manager();
  manager.findManagerById(managerId, function (error, manager) {
    if (error) {
      res.send(error);
      return;
    }

    res.json({
      manager: manager
    });
  });
};

// 添加管理员[Document edit]
module.exports.add_manager = function (req, res) {
  var managerParams = {
    name: req.body.name ? req.body.name : null,
    password: req.body.password ? req.body.password : null,
    brand: req.body.brand ? req.body.brand : null,
  };
  var manager = new Manager();
  manager.addManager(managerParams, function (error, success) {
    if (error) {
      res.json({
        success: false,
        message: error
      });
      return;
    }

    res.json({
      success: success,
      message: ""
    });
  });
};

// 修改管理员[Document edit]
module.exports.edit_manager = function (req, res) {
  var brandParams = {
    slogan: req.body.slogan ? req.body.slogan : null,
    brand_name: req.body.brand_name ? req.body.brand_name : null,
    brand_description: req.body.brand_description ? req.body.brand_description : null,
    brand_icon: req.body.brand_icon ? req.body.brand_icon : null,
  };
  var brandId = req.body.id;
  var brand = new Brand();
  brand.editBrand(brandParams, brandId, function (error, success) {
    if (error) {
      res.json({
        success: false,
        message: error
      });
      return;
    }

    res.json({
      success: success,
      message: ""
    });
  });
};

// 注销管理员[Document edit]
module.exports.delete_manager = function (req, res) {
  var id = req.body.id ? req.body.id : null;
  var manager = new Manager();
  manager.deleteManager(id, function (error, success) {
    if (error) {
      res.json({
        success: false,
        message: error
      });
      return;
    }

    res.json({
      success: success,
      message: ""
    });
  });
};
