const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

//Function to compare ids and delete the note

const readAndDelete = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {

    if (err) {
      console.error(err);
    } else {
      const notes = JSON.parse(data)
      console.log(notes)
      notes.forEach(note => {
        console.log(note.id)
        if (note.id === content) {
          notes.splice(note, 1)
          writeToFile(file, notes)
        }
      })
    }
  });
};

module.exports = { readFromFile, readAndAppend, readAndDelete, writeToFile };
