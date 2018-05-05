var db = require('../db'),
    pool = db.pool;

function User(id, name, password, mi_id, role) {
  this.id = id ? id : null;
  this.id = name ? name : null;
  this.id = password ? password : null;
  this.id = mi_id ? mi_id : null;
  this.id = role ? role : null;
}

User.prototype.searchUserByMiID = function (mi_id, callback) {
  pool.getConnection(function (err, connection) {
    connection.connect();
    connection.query('SELECT id FROM user WHERE mi_id = ?', [mi_id], function (error, results, fields) {
      if (error) {
        return error;
      }

      if (results.length > 0) {
        callback(results[0]['id']);
      }
      else {
        callback(-1);
      }

      connection.release();
    });
  });
};

module.exports = User;
