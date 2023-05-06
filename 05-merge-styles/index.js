const fs = require('fs');
const path = require('path');


let stream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), {encoding: 'utf-8'});

fs.readdir(path.join(__dirname, 'styles'), {encoding: 'utf-8'}, (err, files) => {
    if(err) {
        console.log(err);
    } else {
        files.forEach(file => {
            if(path.extname(path.join(__dirname, 'styles', file)) === '.css') {
                fs.stat(path.join(__dirname, 'styles', file), (err, stats) => {
                    if(err) {
                        console.log(err);
                    } else if(!stats.isDirectory()) {
                        const input = fs.createReadStream(path.join(__dirname, 'styles', file), {encoding: 'utf-8'});
                        input.on('data', file => stream.write(file));
                    }
                });
            }
        });
    }
});