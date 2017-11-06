var fs = require('fs');
module.exports = {
    pwd: function() {
        console.log('yomadog')
    },
    ls: function(file, done) {
        var output = "";
        fs.readdir('.', function(err, files) {
          files.forEach(function(file) {
            output += file.toString() + "\n";
          })
          done(output);
        });
      }
}