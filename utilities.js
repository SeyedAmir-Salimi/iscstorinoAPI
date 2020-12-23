function getArrayofTable(path) {
    var fs = require('fs');
    require.extensions['.dat'] = function (module, filename) {
        module.exports = fs.readFileSync(filename, 'utf8');
    };
    if(!path) return []
    var words = require(path);
    var cells = words.split('\n').map(function (el) { return el.split(/\s+/); });
    var headings = cells.shift();
    const allObjects = []
    cells.map(function (el) {
        var obj = {};
        for (var i = 0, l = el.length; i < l; i++) {
            obj[headings[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
        }
        allObjects.push(obj)
    });
    return allObjects
}

module.exports = {
    getArrayofTable
  }
  