
var commands = require('./commands.js');

process.stdout.write('prompt >')

process.stdin.on('data', function (data) {
    var cmd = data.toString().trim();
    if(cmd.includes('|')) {
        var arguments = cmd.split(/\s*\|\s*/g)
        var func = arguments[0].split(' ')[0],
        param = arguments[0].split(' ')[1],
        stdin = arguments.slice(1);
        commands[func](param, stdin)
    } else {
        var arguments = cmd.split(' ').slice(1).join('');
        cmd = cmd.split(' ')[0]
        commands[cmd](arguments, null)
    }
    
    process.stdout.write(' n\prompt >');

});