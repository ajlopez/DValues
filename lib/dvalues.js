
var maxdsid = 0;

function addDatasource(name, context, tags) {
    maxdsid++;
    
    return maxdsid;
}

module.exports = {
    addDatasource: addDatasource
}