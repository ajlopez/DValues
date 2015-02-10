
var maxdsid = 0;
var dss = { };
var vars = { };
var maxvarid = 0;

function addDatasource(name, context, tags) {
    maxdsid++;
    var key = maxdsid.toString();
    
    dss[key] = { name: name, context: context, tags: tags };
    
    return key;
}

function getDatasource(key) {
    return dss[key];
}

function getDatasources() {
    var result = [];
    
    for (var n in dss)
        result.push(dss[n]);
        
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
    vars[key] = { datasource: ds, variable: variable };
    
    return key;
}

function getDatasourceVariables(dsid) {
    var dss = getDatasource(dsid);
    
    if (!dss.variables)
        return [];
        
    var result = [];
    
    for (var n in dss.variables)
        result.push(dss.variables[n]);
        
    return result;
}

function getVariables() {
    var result = [];
    
    for (n in dss)
        result = result.concat(getDatasourceVariables(n));
        
    return result;
}

function getVariable(varid) {
    return vars[varid].variable;
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

