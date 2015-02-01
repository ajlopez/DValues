
var maxdsid = 0;
var ds = { };

function addDatasource(name, context, tags) {
    maxdsid++;
    var key = maxdsid.toString();
    
    ds[key] = { name: name, context: context, tags: tags };
    
    return key;
}

function getDatasource(key) {
    return ds[key];
}

module.exports = {
    addDatasource: addDatasource,
    getDatasource: getDatasource
}