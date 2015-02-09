
var maxdsid = 0;
var ds = { };
var vars = { };
var maxvarid = 0;

function addDatasource(name, context, tags) {
    maxdsid++;
    var key = maxdsid.toString();
    
    ds[key] = { name: name, context: context, tags: tags };
    
    return key;
}

function getDatasource(key) {
    return ds[key];
}

function getDatasources() {
    var result = [];
    
    for (var n in ds)
        result.push(ds[n]);
        
    return result;
}

function addDatasourceVariable(dsid, name, unit, description, properties, tags) {
    var ds = getDatasource(dsid);
    
    if (!ds.variables)
        ds.variables = { };
        
    maxvarid++;
    var key = maxvarid.toString();
    var variable = { name: name, unit: unit, description: description, properties: properties, tags: tags };
    
    ds.variables[key] = variable;
    vars[key] = variable;
    
    return key;
}

function getDatasourceVariables(dsid) {
    var ds = getDatasource(dsid);
    
    if (!ds.variables)
        return [];
        
    var result = [];
    
    for (var n in ds.variables)
        result.push(ds.variables[n]);
        
    return result;
}

function getVariables() {
    var result = [];
    
    for (n in ds)
        result = result.concat(getDatasourceVariables(n));
        
    return result;
}

function getVariable(varid) {
    return vars[varid];
}

module.exports = {
    getDatasources: getDatasources,
    addDatasource: addDatasource,
    getDatasource: getDatasource,
    addDatasourceVariable: addDatasourceVariable,
    getDatasourceVariables: getDatasourceVariables,
    getVariables: getVariables,
    getVariable: getVariable
}

