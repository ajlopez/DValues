
var maxdsid = 0;
var dss = { };
var vars = { };
var maxvarid = 0;
var maxvalid = 0;

function addDatasource(name, context, tags) {
    maxdsid++;
    var key = maxdsid.toString();
    
    dss[key] = { name: name, context: context, tags: tags, variables: { } };
    
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

function addDatasourceVariable(dsid, name, unit, description, properties, tags) {
    var ds = dss[dsid];
    
    if (!ds.variables)
        ds.variables = { };
        
    maxvarid++;
    var key = maxvarid.toString();
    var variable = { id: key, name: name, unit: unit, description: description, properties: properties, tags: tags, values: {} };
    
    ds.variables[key] = variable;
    vars[key] = { datasource: ds, variable: variable };
    
    return key;
}

function addVariableValue(varid, value, context, timestamp) {
    var vr = getVariable(varid);
    
    if (!timestamp)
        timestamp = Date.now();
        
    maxvalid++;
    var key = maxvalid.toString();
    var value = { id: key, value: value, context: context, timestamp: timestamp };
    
    vr.values[key] = value;
    
    return value;
}

function getDatasourceVariables(dsid) {
    var ds = dss[dsid];
    
    if (!ds || !ds.variables)
        return [];

    var result = [];
    
    for (var n in ds.variables)
        result.push(ds.variables[n]);
        
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
    return [];
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
    getVariableValues: getVariableValues
}

