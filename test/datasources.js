
var dvalues = require('..');

exports['Get no datasource'] = function (test) {
    var result = dvalues.getDatasources();
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 0);
}

exports['Add datasource'] = function (test) {
    var name = 'Datasource 1';
    var context = {};
    var tags = [];
    var result = dvalues.addDatasource(name, context, tags);
    test.ok(result);
}

exports['Add and get datasource'] = function (test) {
    var name = 'Datasource 2';
    var context = { description: 'Description 2', author: 'Adam' };
    var tags = [ 'arduino', 'mobile' ];
    var result = dvalues.addDatasource(name, context, tags);
    var ds = dvalues.getDatasource(result);
    test.ok(ds);
    test.equal(ds.name, name);
    test.deepEqual(ds.context, context);
    test.deepEqual(ds.tags, tags);
}

