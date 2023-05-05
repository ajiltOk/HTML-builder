const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'secret-folder'), {encoding: 'utf-8', withFileTypes: true}, (err, files) => {
    if(err) {
      console.log(err);
    } else {
        let name;
        let format;

        files.forEach(file => {
            if(!file.isDirectory()) {
                fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
                    name = path.basename(file.name, path.extname(file.name));
                    format = path.extname(file.name);
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(name + ' - ' + format.replace('.', '') + ' - ' + stats.size / 1000 + 'kB');
                    }
                })
            }  
        })
    }    
});
