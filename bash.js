
var commands = require('./commands.js');

process.stdout.write('prompt >')

process.stdin.on('data', function (data) {
    var cmd = data.toString().trim();
    if(cmd.includes('|')) {
        var arguments = cmdString.split(/\s*\|\s*/g)
    }
    var arguments = cmd.split(' ').slice(1).join('');
    cmd = cmd.split(' ')[0]
    commands[cmd](arguments)
    process.stdout.write(' n\prompt >');

});