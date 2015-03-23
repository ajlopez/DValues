
var maxdsid = 0;
var dss = { };
var vars = { };
var maxvarid = 0;
var maxvalid = 0;

function addDatasource(data) {
    maxdsid++;
    var key = maxdsid.toString();
    
    dss[key] = { id: key, name: data.name, context: data.context, tags: data.tags, variables: { } };
    
    return key;
}

function getDatasource(key) {
    var ds = dss[key];
    
    if (!ds)
        return null;
        
    return {
        id: key,
        name: ds.name,
        context: ds.context,
        tags: ds.tags,
        nvariables: Object.keys(ds.variables).length
    };
    
    return dss[key];
}

function deleteDatasource(key) {
    var ds = dss[key];

    if (!ds)
        return;
        
    delete dss[key];
    
    if (ds.variables)
        for (var n in ds.variables)
            delete vars[n];
}

function getDatasources() {
    var result = [];
    
    for (var n in dss)
        result.push(getDatasource(n));
        
    return result;
}

function addDatasourceVariable(dsid, data) {
    var ds = dss[dsid];
    
    if (!ds.variables)
        ds.variables = { };
        
    maxvarid++;
    var key = maxvarid.toString();
    var variable = { id: key, name: data.name, unit: data.unit, description: data.description, properties: data.properties, tags: data.tags, values: {} };
    
    ds.variables[key] = variable;
    vars[key] = { datasource: ds, variable: variable };
    
    return key;
}

function addVariableValue(varid, data) {
    var vr = getVariable(varid);
    var timestamp = data.timestamp;
    
    if (!timestamp)
        timestamp = Date.now();
        
    maxvalid++;
    var key = maxvalid.toString();
    var value = { id: key, value: data.value, context: data.context, timestamp: timestamp };
    
    vr.values[key] = value;
    
    return value;
}

function addVariableValues(varid, values) {
    var result = [];
    
    values.forEach(function (value) {
        result.push(addVariableValue(varid, value));
    });
    
    return result;
}

function getDatasourceVariables(dsid) {
    var ds = dss[dsid];
    
    if (!ds || !ds.variables)
        return [];

    var result = [];
    
    for (var n in ds.variables) {
        var variable = ds.variables[n];
        result.push({ id: variable.id, name: variable.name, unit: variable.unit, description: variable.description, properties: variable.properties, tags: variable.tags });
    }
        
    return result;
}

function getVariables() {
    var result = [];
    
    for (n in dss)
        result = result.concat(getDatasourceVariables(n));
        
    return result;
}

function getVariable(varid) {
    if (!vars[varid])
        return null;
        
    return vars[varid].variable;
}

function deleteVariable(varid) {
    if (vars[varid]) {
        var ds = vars[varid].datasource;
        delete vars[varid];
        
        if (ds && ds.variables && ds.variables[varid])
            delete ds.variables[varid];
    }
}

function getVariableValues(varid) {
    var vr = getVariable(varid);
    
    var result = [];
    
    for (var n in vr.values)
        result.push(vr.values[n]);
        
    return result;
}

function deleteVariableValues(varid) {
    var vr = getVariable(varid);
    vr.values = [];
}

module.exports = {
    getDatasources: getDatasources,
    addDatasource: addDatasource,
    getDatasource: getDatasource,
    deleteDatasource: deleteDatasource,
    addDatasourceVariable: addDatasourceVariable,
    getDatasourceVariables: getDatasourceVariables,
    getVariables: getVariables,
    getVariable: getVariable,
    deleteVariable: deleteVariable,
    addVariableValue: addVariableValue,
    addVariableValues: addVariableValues,
    getVariableValues: getVariableValues,
    deleteVariableValues: deleteVariableValues
}

