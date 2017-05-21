var fs = require('fs');
module.exports = function(app, express){
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js" || file.indexOf('.js') < 0) return;
        var name = file.substr(0, file.indexOf('.js'));
        require('./' + name)(app, express);
    });
}