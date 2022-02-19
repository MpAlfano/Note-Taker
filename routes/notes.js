const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');

//Route for retrieving all the notes
notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// Post Route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`New note added successfully`);
  } else {
    res.error('Error in adding new note');
  }
});

// Delete Route for a note
notes.delete(`/`, (req, res) => {
  console.log(req.baseUrl)
  noteid = req.baseUrl.split('api/notes/').pop()
  console.log(noteid)
  readAndDelete(noteid, './db/db.json')
  res.end()
})



module.exports = notes;