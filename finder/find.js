var fs = require('fs'); 
var path = require('path');


var findAsyn = function(dir, file, cb){
    var results = [];
    var asynOps = 0; 
    var errorFlag = false; 
    file = new RegExp(file);
    dir = path.resolve(dir);

    find(dir);

    function find(dir){
        asynOps++; 
        fs.readdir(dir, (err, files) => {
            asynOps--;
            if(err)
                error(err);
            else 
                Array.prototype.forEach.call(files, (fileName) => {
                    asynOps++; 
                    var fPath = path.join(dir, fileName);
                    fs.stat(fPath, (err, stats) => {
                        asynOps--; 
                        if(err)
                            error(err); 
                        else {
                            if(stats.isDirectory())
                                find(fPath); 
                            else{
                                if(file.test(fileName))
                                    results.push(fPath);
                            }
                        }
                        if(asynOps === 0)
                            cb(results); 
                    })
                })
        })
    }

    function error(err){
        if(!errorFlag)
            console.error(err);
        errorFlag = true; 
    }
}

var findSync = function(dir, file, cb){
    var result = [];
    dir = path.resolve(dir);
    file = new RegExp(file); 
    
    function find(dir){
        var files = fs.readdirSync(dir); 
        Array.prototype.forEach.call(files, (fileName) => {
            var stats = fs.statSync(path.join(dir, fileName)); 
            if(stats.isDirectory()) 
                find(path.join(dir, fileName)); 
            else {
                if(file.test(fileName)) 
                    result.push(path.join(dir, fileName));
            }
        });
    }
    find(dir);
    cb(result);
    return result; 
}

module.exports = {
    findAsyn: findAsyn,
    findSync: findSync
}
// findAsyn(__dirname, 'find.*', result => console.log(result.join('\n')));
// findSync(__dirname, 'find.*', result => console.log(result.join('\n')));
// console.log(res);