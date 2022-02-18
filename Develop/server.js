const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//Homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

//Notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

//Catch to return to homepage
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
)

//To verify server is running
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
