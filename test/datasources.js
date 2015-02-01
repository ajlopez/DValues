
var dvalues = require('..');

exports['Add datasource'] = function (test) {
    var name = 'Datasource 1';
    var context = {};
    var tags = [];
    var result = dvalues.addDatasource(name, context, tags);
    test.ok(result);
}


