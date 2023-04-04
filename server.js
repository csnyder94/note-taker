const express = require('express');
const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req,res) => {
  res.sendFile(path.join(__dirname,"/public/notes.html"));
});


// FROM HERE UP IS server.js 11-19 ins

// HTML routes for notes.html and index.html


// Here Below Is #19 Also
app.listen(PORT, () =>
  console.log(`App App listening at http://localhost:${PORT}`)
);