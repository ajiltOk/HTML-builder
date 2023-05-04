const path = require('path');
const fs = require('fs');

fs.readFile(
    path.join(__dirname, './01-read-file', '../text.txt'),
    'utf-8',
    (err, data) => {
        if (err) throw err;
        console.log(data);
    }
);