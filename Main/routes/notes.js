const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');

//Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // Post Route for a new note
notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newTip = {
        title,
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newTip, './db/db.json');
      res.json(`note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });
  
module.exports = notes;