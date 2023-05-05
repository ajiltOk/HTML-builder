const fs = require('fs');
const path = require('path');
const { stdin } = process;

let stream = new fs.WriteStream(path.join(__dirname, 'hello.txt'), {encoding: 'utf-8'}, text());

function text() {
  console.log('Введите текст...');
}

function exit() {
  console.log('Удачи на курсе)');
  process.exit();
}

stdin.on('data', data => { 
  data.toString().trim() === 'exit' ? exit() : stream.write(data);
}); 

process.on('SIGINT', exit);