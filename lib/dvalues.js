
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

function getDatasources() {
    var result = [];
    
    for (var n in ds)
        result.push(ds[n]);
        
    return result;
}

module.exports = {
    getDatasources: getDatasources,
    addDatasource: addDatasource,
    getDatasource: getDatasource
}