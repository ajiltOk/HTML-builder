const fs = require('fs');
const path = require('path');

function copyDir() {
    fs.mkdir(path.join(__dirname, 'files-copy'), {encoding: 'utf-8', recursive: true}, err => {
        if(err) throw err;
    });

    fs.readdir(path.join(__dirname, 'files-copy'), {encoding: 'utf-8'}, (err, filesNew) => {
        if(err) {
            console.log(err);
        }
        fs.readdir(path.join(__dirname, 'files'), {encoding: 'utf-8'}, (err, files) => { 
            if(err) {
              console.log(err);
            } else {
                files.forEach(file => {
                    if(filesNew.length === 0 || files.length > filesNew.length) {
                        const input = fs.createReadStream(path.join(__dirname, 'files', file), {encoding: 'utf-8'});
                        const output = fs.createWriteStream(path.join(__dirname, 'files-copy', file));
                        input.on('data', file => output.write(file));
                    } else if(files.length < filesNew.length) {
                        filesNew.forEach(element => {
                            if(!files.includes(element)) {
                                fs.unlink(path.join(__dirname, 'files-copy', element), (err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                            }
                        });
                    }
                })
            };    
        });
    });
}

copyDir();