const fs = require("fs");

function exists(filepath) {
  return new Promise(resolve => {
    fs.access(filepath, fs.constants.F_OK, err => {
      return resolve(!err);
    });
  });
}

/**
 * 读文件
 */
function readFile(path, options) {
  return new Promise((resolve, reject) => {
    const callback = function(err, data) {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    };

    if (options) {
      fs.readFile(path, options, callback);
    } else {
      fs.readFile(path, callback);
    }
  });
}

module.exports = {
  exists,
  readFile
};
