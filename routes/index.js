const express = require('express');

const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);
app.use('/notes/:id', notesRouter);

module.exports = app;