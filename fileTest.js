var fs = require('fs'); 

// var writable = fs.createWriteStream('./copy.file');
// var readable = fs.createReadStream('./original.file');

// readable.pipe(writable);

// var anotherWrite = fs.createWriteStream('./original.file');

var open1 = fs.open('original.file', 'wx', function(err, data){
    if(err){
        console.error(err);
    } else console.log('open file in exclusive way');
}); 

var open2 = fs.open('original.file', 'w+', function(err, data){
    if(err)
        console.error(err);
    else
        console.log('open file uppon exclusive locked file');
})