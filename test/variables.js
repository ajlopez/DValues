
var dvalues = require('..');
var sl = require('simplelists');

var dsid;
var varid;
var valid;

exports['Create datasource'] = function (test) {
    var result = dvalues.getDatasources();
    
    var name = 'Datasource 1';
    var context = {};
    var tags = [];
    var result = dvalues.addDatasource(name, context, tags);
    test.ok(result);
    
    dsid = result;
}

exports['Get no variables from datasource'] = function (test) {
    var result = dvalues.getDatasourceVariables(dsid);
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 0);
}

exports['Get no variables'] = function (test) {
    var result = dvalues.getVariables();
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
    var result = dvalues.addDatasourceVariable(dsid, { name: name, unit: unit, description: description, properties: properties, tags: tags });
    test.ok(result);
    varid = result;
}

exports['Get variables from datasource'] = function (test) {
    var result = dvalues.getDatasourceVariables(dsid);
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    test.equal(result[0].name, 'var1');
    test.equal(result[0].unit, 'meters');
    test.equal(result[0].description, 'Variable 1');
    test.deepEqual(result[0].properties, {});
    test.deepEqual(result[0].tags, []);
}

exports['Get variables'] = function (test) {
    var result = dvalues.getVariables();
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    test.equal(result[0].name, 'var1');
    test.equal(result[0].unit, 'meters');
    test.equal(result[0].description, 'Variable 1');
    test.deepEqual(result[0].properties, {});
    test.deepEqual(result[0].tags, []);
}

exports['Get variable'] = function (test) {
    var result = dvalues.getVariable(varid);
    test.ok(result);
    test.equal(result.name, 'var1');
    test.equal(result.unit, 'meters');
    test.equal(result.description, 'Variable 1');
    test.deepEqual(result.properties, {});
    test.deepEqual(result.tags, []);
}

exports['Delete variable'] = function (test) {
    var name = 'var2';
    var unit = 'meters';
    var description = 'Variable 2';
    var properties = {};
    var tags = [];
    var newvarid = dvalues.addDatasourceVariable(dsid, name, unit, description, properties, tags);
    test.ok(newvarid);
    
    test.ok(dvalues.getVariable(newvarid));
    
    dvalues.deleteVariable(newvarid);
    
    test.equal(dvalues.getVariable(newvarid));
}

exports['Deleted variable was removed from datasource'] = function (test) {
    var vars = dvalues.getDatasourceVariables(dsid);
    test.ok(vars);
    test.equal(vars.length, 1);
}

exports['Get no values from variable'] = function (test) {
    var result = dvalues.getVariableValues(varid);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 0);
}

exports['Add a value to a variable'] = function (test) {
    var context = { description: 'the answer' };
    var result = dvalues.addVariableValue(varid, { value: 42, context: context });
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.ok(result.id);
    test.ok(result.value);
    test.ok(result.context);
    test.ok(result.timestamp);
    
    test.equal(result.value, 42);
    test.deepEqual(result.context, context);
}

exports['Get values from variable'] = function (test) {
    var result = dvalues.getVariableValues(varid);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    test.ok(result[0].id);
    test.equal(result[0].value, 42);
    test.deepEqual(result[0].context, { description: 'the answer' });
    test.ok(result[0].timestamp);
}

exports['Add values to a variable'] = function (test) {
    var context1 = { description: 'number one' };
    var context2 = { description: 'number two' };
    var result = dvalues.addVariableValues(varid, [{ value: 1, context: context1 }, { value: 2, context: context2 }]);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(2, result.length);
    
    test.ok(result[0].id);
    test.ok(result[0].timestamp);
    test.equal(result[0].value, 1);
    test.deepEqual(result[0].context, context1);
    
    test.ok(result[1].id);
    test.ok(result[1].timestamp);
    test.equal(result[1].value, 2);
    test.deepEqual(result[1].context, context2);
}

exports['When delete the datasource, variable is deleted'] = function (test) {
    dvalues.deleteDatasource(dsid);
    var result = dvalues.getVariable(varid);
    test.equal(result, null);
}


