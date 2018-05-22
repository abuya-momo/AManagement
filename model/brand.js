var db = require('../db'),
    moment = require('moment');
    pool = db.pool;

function Brand (id, slogan, brand_name, brand_icon, brand_description) {

}

// 获取品牌列表[RL]
Brand.prototype.getBrandList = function (callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
      return;
    }

    connection.connect();
    connection.query('SELECT b FROM brand', null, function (error, results, fields) {
      if (error) {
        callback(error);
        return;
      }

      console.log(results);

      if (results.length > 0) {
        callback(null, results);
      }

      connection.release();
    });
  });
}

// 根据品牌id查询品牌详情，如果没有找到则返回-1[R]
Brand.prototype.findBrandById = function (id, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
      return;
    }

    connection.connect();
    connection.query('SELECT * FROM brand WHERE id = ?', id, function (error, results, fields) {
      if (error) {
        callback(error);
        return;
      }

      if (results.length > 0) {
        connection.query('SELECT state FROM device_type WHERE brand = ?', id, function (error, states, fields) {
          if (error) {
            callback(error);
            return;
          }

          var result = results[0];
          result.states = states.map(function (item, index) {
            return item.state;
          });
          callback(null, result);

          connection.release();
        });
      } else {
        callback(null, -1);
      }
    });
  });
}

// 添加品牌[C]
Brand.prototype.addBrand = function (brand, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
    }

    connection.connect();
    var sql = 'INSERT INTO brand (brand_name, slogan, brand_description, brand_icon) VALUES (?, ?, ?, ?)';
    connection.query(
      sql,
      [brand.brand_name, brand.slogan, brand.brand_description, brand.brand_icon],
      function (error, results, fields) {
        if (error) {
          if (error.code == "ER_DUP_ENTRY") {
            callback("品牌名称和现有品牌重复，添加失败", false);
            return;
          }
          callback(error, false);
          return;
        }

        callback(null, true);
        connection.release();
      }
    );
  });
};

// 修改品牌[U]
Brand.prototype.editBrand = function (brand, id, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
      return;
    }

    connection.connect();
    var sql = 'UPDATE brand SET slogan = ?, brand_name = ?, brand_description = ?, brand_icon = ? WHERE id = ?';
    connection.query(
      sql,
      [brand.slogan, brand.brand_name, brand.brand_description, brand.brand_icon, id],
      function (error, results, fields) {
        if (error) {
          if (error.code == "ER_DUP_ENTRY") {
            callback("品牌名称和现有品牌重复，添加失败", false);
            return;
          }
          callback(error, false);
          return;
        }

        callback(null, true);
        connection.release();
    });
  });
};

module.exports = Brand;
