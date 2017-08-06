var fs = require('fs');
var findSync = require('./find').findSync; 
var findAsyn = require('./find').findAsyn;

var args = {
    'sync': findSync,
    'asyn': findAsyn
};

var argv = process.argv.slice(2); 

if(argv.length < 2){
    console.error(new Error('need dir path and file name'));
} 

if(argv[3])
    args[argv[3]].call(this, argv[0], argv[1], result => console.log(result.join('\n'))); 
else 
    findAsyn.call(this, argv[0], argv[1], result => console.log(result.join('\n')));