const express = require('express'); //Importing modules
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid'); //Importing helper tp give notes unique ID
const { readFromFile } = require('./helpers/fsUtils'); //Using readFromFile from helper

const PORT = 3001; //Sets the port and initialize the app
const app = express();

app.use(express.json());  //Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/index', (req, res) => { //Route for index page
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => { //Route for notes page
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => { //API route to retrieve notes
  readFromFile(path.join(__dirname, 'db', 'db.json'))
    .then((data) => res.json(JSON.parse(data)))
});

app.post('/api/notes', (req, res) => { //API route to add a new note
  const { title, text } = req.body;
  const noteInput = { title, text, id: uuid() }; //uuid is unique id

      fs.readFile(path.join(__dirname, 'db', 'db.json'), (err, data) => { //Read the existing notes from the db file
      if (err) throw err;

      const dbInput = JSON.parse(data);
      dbInput.push(noteInput);

      fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(dbInput), (err) => { // Write the new note to the db file
        if (err) throw err;
        console.log('Successfully added note');
    });
  });

const response = {    // Send a response to the client
  status: 'success',
  body: noteInput,
}
  res.json(response);
});

app.listen(PORT, () => { //Listens on local server
  console.log(`App listening at http://localhost:${PORT}`);
});