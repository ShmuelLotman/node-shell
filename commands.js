var fs = require('fs');
var req = require('request');
module.exports = {
    pwd: function(file) {
      var output = process.cwd().toString();
      module.exports.done(output)
    },
  
    date: function(file) {
      var date = new Date();
      var output = date.toString();
      module.exports.done(output);
    },
    ls: function(file) {
        fs.readdir('.', function(err, files) {
            var finalStr = '';
            if (err) throw err;
            files.forEach(function(file) {
              finalStr += (file.toString() + "\n");
            })
            module.exports.done(finalStr)
          });
    },
    echo: function(file) {
        module.exports.done(file);
        
    },
    cat: function(file, stdin = null) {
        var finalStr = '';
        fs.readFile(file, function(err, data) {
            if(err) throw err;
            finalStr += (data.toString())
            if(stdin === null) {
                module.exports.done(finalStr, null)
            } else {
                if(stdin.length === 0) {
                    module.exports.done(finalStr, null)
                }
                module.exports.done(finalStr, stdin)
            }
        })
        
    },
    head: function(file, stdin = null) {
        fs.readFile(file, function(err, data) {
            if(err) throw err;
            var lines = data.toString().trim().split('\n'),
            finalStr = '';
            for(var i = 0; i < 5; i++) {
                finalStr += (lines[i] + '\n')
            }
            if(stdin === null) {
                module.exports.done(finalStr)
            } else {
                if(stdin.length === 0) {
                    module.exports.done(finalStr, null)
                }
                module.exports.done(finalStr, stdin)
            }
        })
    },
    tail: function(file, stdin = null) {
        fs.readFile(file, function(err, data) {
            if(err) throw err;
            var lines = data.toString().trim().split('\n'),
            finalStr = '';
            for(var i = lines.length-5; i < lines.length; i++) {
                finalStr += (lines[i] + '\n')
            }
            if(stdin === null) {
                module.exports.done(finalStr, null)
            } else {
                module.exports.done(file, stdin)
            }
        })
    },
    sort: function(file, stdin=null) {
        fs.readFile(file, function(err, data) {
            if(err) throw err;
            var lines = data.toString().trim().split('\n'),
            finalStr = '';
            lines = lines.sort();
            lines.forEach(function(a) {
                finalStr += (a + '\n')
            })
            if(stdin === null) {
                module.exports.done(finalStr, null)
            } else {
                module.exports.done(file, stdin)
            }
        })
    }, 
    wc: function(file, stdin=null) {
        if(stdin === null || stdin.length === 0) {
            var lengthOfLines = file.split('\n').length;
            module.exports.done(lengthOfLines, null)
        } else {
            fs.readFile(file, function(err, data) {
                if(err) throw err;
                var lines = data.toString().trim().split('\n');
                let lengthOfLines = lines.length;
                module.exports.done(lengthOfLines, stdin)
            })
            
        }
        
        
    },
    uniq: function(file, stdin=null) {
        fs.readFile(file, function(err, data) {
            if(err) throw err;
            var lines = data.toString().trim().split('\n').sort();
            var final = '';
            for(var i = 0; i < lines.length-1; i++) {
                if(lines[i] !== lines[i+1]) {
                    final += (lines[i] + '\n')
                }
            }
            if(stdin === null) {
                module.exports.done(final, null)
            } else {
                module.exports.done(file, stdin)
            }
        })
    },
    curl: function(file, stdin=null) {
        var finalStr = '';
        req(file.toString(), function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            finalStr += body;
            module.exports.done(finalStr)
          });
    },
    done: function(output, stdin) {
        if(stdin === null) {
            console.log(output)
        } else {
            var expts = module.exports;
            var x = stdin.shift();
            if(typeof x !== 'undefined') {
                expts[x](output, stdin)
            } else {
                console.log(output)
            }
            
            
        }
        
        console.log('prompt >')
    }
}