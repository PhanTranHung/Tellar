
let fs = require('fs');

function writeData(data, fileName) {
  fs.writeFile(__dirname + '/' + fileName, data, err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  });
}

function readData(fileName){
  let rawData = fs.readFileSync(__dirname + '/' + fileName);
  return JSON.parse(rawData);
}

exports = module.exports;
exports.writeData = writeData;
exports.readData = readData;
