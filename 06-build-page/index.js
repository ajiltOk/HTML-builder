const fs = require('fs');
const path = require('path');


// Создание директории project-dist


fs.mkdir(path.join(__dirname, 'project-dist'), {encoding: 'utf-8', recursive: true}, err => {
    if(err) {
        console.log(err);
    }
});


// Создание документа style.css


let streamStyles = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'), {encoding: 'utf-8'});

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
                        input.on('data', file => streamStyles.write(file));
                    }
                });
            }
        });
    }
});


// Копирование файлов assets и создание для них директорий


fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {encoding: 'utf-8', recursive: true}, err => {
    if(err) {
        console.log(err);
    } 
});

fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), {encoding: 'utf-8', recursive: true}, err => {
    if(err) {
        console.log(err);
    } else {
        copyDir('fonts');
    }
});

fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), {encoding: 'utf-8', recursive: true}, err => {
    if(err) {
        console.log(err);
    } else {
        copyDir('img');
    }
});

fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), {encoding: 'utf-8', recursive: true}, err => {
    if(err) {
        console.log(err);
    } else {
        copyDir('svg');
    }
});

function copyDir(fileCopy) {
    fs.readdir(path.join(__dirname, 'project-dist', 'assets', fileCopy), {encoding: 'utf-8'}, (err, filesNew) => {
        if(err) {
            console.log(err);
        }
        fs.readdir(path.join(__dirname, 'assets', fileCopy), {encoding: 'utf-8'}, (err, files) => { 
            if(err) {
              console.log(err);
            } else {
                files.forEach(file => {
                    if(filesNew.length === 0 || files.length > filesNew.length) {
                        const input = fs.createReadStream(path.join(__dirname, 'assets', fileCopy, file), {encoding: 'utf-8'});
                        const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'assets', fileCopy, file));
                        input.on('data', file => output.write(file));
                    } else if(files.length < filesNew.length) {
                        filesNew.forEach(element => {
                            if(!files.includes(element)) {
                                fs.unlink(path.join(__dirname, 'project-dist', 'assets', fileCopy, element), (err) => {
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


// Создание документа index.html, копирование в него данных из template.html и замена тегов на содержимое файлов из папки compontnts


fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'), {encoding: 'utf-8'})

fs.readFile(path.join(__dirname, 'template.html'), {encoding: 'utf-8'}, (err, dataTemplate) => {
    if(err) {
        console.log(err);
    } else {
        fs.readdir(path.join(__dirname, 'components'), {encoding: 'utf-8'}, (err, files) => {
            if(err) {
                console.log(err);
            } else {
                let change;
                files.forEach(file => {
                    let fileName = path.basename(path.join(__dirname, 'components', file), path.extname(path.join(__dirname, 'components', file)));
                    fs.readFile(path.join(__dirname, 'components', file), {encoding: 'utf-8'}, (err, data) => {
                        if(err) {
                            console.log(err);
                        } else {
                            if(files.indexOf(file) === 0) {
                                change = dataTemplate.replace('{{' + fileName + '}}', data);
                            } else if(files.indexOf(file) === files.length - 1) {
                                change = change.replace('{{' + fileName + '}}', data);
                                fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), change, {encoding: 'utf-8'}, err => {
                                    if(err) {
                                        console.log(err);
                                    }
                                })
                                change = '';
                            } else {
                                change = change.replace('{{' + fileName + '}}', data);
                            }
                        }
                    });
                })
            }
        });
    }
});