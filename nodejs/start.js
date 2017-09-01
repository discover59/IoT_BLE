var spawn = require('child_process').spawn,
    py    = spawn('python', ['../python/compute_input.py']),
    dataString = '';

fs = require('fs');
fs.readFile('../python/sample.png', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    console.log(data);
});
/*Here we are saying that every time our node application receives
 data from the python process output stream(on 'data'), we want to convert
 that received data into a string and append it to the overall dataString.*/
py.stdout.on('data', function(data){
    dataString += data.toString();
    // console.log('first', data.toString());
});

py.stdout.on('end', function(){
    // console.log('second',dataString);
});

/*We have to stringify the data first otherwise our python process wont recognize it*/
/*
py.stdin.write(JSON.stringify(data));
py.stdin.end();*/

py.stdin.write('Start');
py.stdin.end();