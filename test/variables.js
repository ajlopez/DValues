
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

exports['Add variable'] = function (test) {
    var name = 'var1';
    var unit = 'meters';
    var description = 'Variable 1';
    var properties = {};
    var tags = [];
    var result = dvalues.addVariable(dsid, name, unit, description, properties, tags);
    test.ok(result);
}
