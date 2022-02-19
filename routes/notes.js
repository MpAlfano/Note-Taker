const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, } = require('../helpers/fsUtils');

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

notes.delete(`/`, (req, res) => {
  console.log(req.baseUrl)
  noteid = req.baseUrl.split('api/notes/').pop()
  console.log(noteid)
  fs.writeFile(apiDB, data, (err) => err ? console.error(err) : console.log('Updated'))
  res.end()
})

// notes.delete(`/`, (req, res) => {
//   let data = JSON.stringify(req.params.id);
//   let notes = readFromFile('./db/db.json')
//   console.log(req.params.id)
//   data.forEach(note => {
//     if (note.id == req.params.id) {
//           console.log(`Deleted`);
//           notes.splice(i, 1); 
//         }
//   });
//   fs.writeFile(apiDB, data, (err) => err ? console.error(err) : console.log('Updated'))
// })


module.exports = notes;