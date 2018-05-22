var Brand = require('../model/brand');

// 获取品牌列表[Document edit]
module.exports.brands = function (req, res) {
  var brand = new Brand();
  brand.getBrandList(function (error, brandList) {
    if (error) {
      res.send(error);
      return;
    }

    res.json({
      brands: brandList
    });
  });
}

// 获取品牌详情
module.exports.brand = function (req, res) {
  var brandId = req.query.id;
  var brand = new Brand();
  brand.findBrandById(brandId, function (error, brand) {
    if (error) {
      res.send(error);
      return;
    }

    res.json({
      brand: brand
    });
  });
};

// 添加品牌[Document edit]
module.exports.add_brand = function (req, res) {
  var brandParams = {
    slogan: req.body.slogan ? req.body.slogan : null,
    brand_name: req.body.brand_name ? req.body.brand_name : null,
    brand_description: req.body.brand_description ? req.body.brand_description : null,
    brand_icon: req.body.brand_icon ? req.body.brand_icon : null,
  };
  var brand = new Brand();
  brand.addBrand(brandParams, function (error, success) {
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

// 修改品牌[Document edit]
module.exports.edit_brand = function (req, res) {
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
