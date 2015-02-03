
var dvalues = require('..');
var sl = require('simplelists');

var dsid;

exports['Create datasource'] = function (test) {
    var result = dvalues.getDatasources();
    
    var name = 'Datasource 1';
    var context = {};
    var tags = [];
    var result = dvalues.addDatasource(name, context, tags);
    test.ok(result);
    
    dsid = result;
}

exports['Get no variables'] = function (test) {
    var result = dvalues.getVariables(dsid);
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 0);
}

exports['Add variable'] = function (test) {
    var name = 'var1';
    var unit = 'meters';
    var description = 'Variable 1';
    var properties = {};
    var tags = [];
    var result = dvalues.addVariable(dsid, name, unit, description, properties, tags);
    test.ok(result);
}

exports['Get variables'] = function (test) {
    var result = dvalues.getVariables(dsid);
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    test.equal(result[0].name, 'var1');
    test.equal(result[0].unit, 'meters');
    test.equal(result[0].description, 'Variable 1');
    test.deepEqual(result[0].properties, {});
    test.deepEqual(result[0].tags, []);
}

