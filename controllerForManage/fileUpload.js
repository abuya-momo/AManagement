var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'public/images/' });
// var upload = multer();

module.exports.upload_pic = function(req, res) {
  console.log(req.file);
  console.log(req.files);
  console.log(req.body);

  // 获得文件的临时路径
  console.log();
  var tmp_path = req.files.path;
  // 指定文件上传后的目录 - 示例为"images"目录。
  var target_path = '../public/images/' + req.files.filename + '.jpeg';
  // 移动文件
  fs.rename(tmp_path, target_path, function(err) {
    if (err) throw err;
    // 删除临时文件夹文件,
    fs.unlink(tmp_path, function() {
      if (err) throw err;
      res.json({
        fileUrl: req.files.size
      });
    });
  });
  res.send('ok');
}

// module.exports = router;
