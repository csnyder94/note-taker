const path = require('path'); //Import the necessary modules
const fs = require('fs');
const uuid = require('../helpers/uuid');
const router = require('express').Router();

router.get('/notes', (req, res) => { //Define a GET route for the '/notes' path
  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'),  (err, data) =>{  // Read the data from the db.json file
    if (err) throw err;
    res.json(JSON.parse(data)) //Send the data back to the client as a JSON response
  });
});


router.post('/notes', (req, res) => { //Define a POST route for the '/notes' path
  
  const { title, text } = req.body; //Extract the title and text from the request body
  const noteInput = { title, text, id: uuid() }; //Create a new note object with a unique ID using the uuid module

  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), (err, data) => { //Read the existing data from the db.json file
    if (err) throw err;

    const dbInput = JSON.parse(data); //Parse the data as JSON
    dbInput.push(noteInput); //Add the new note object to the array of notes

    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(dbInput), (err) => { //Write the updated data back to the db.json file
      if (err) throw err;
      console.log('Successfully added note');
      const response = { //Send a JSON response indicating that the note was added successfully
        status: 'success',
        body: noteInput,
      }
      res.json(response);
    });
  });
});

router.delete('/notes/:id', (req, res) => { //Define a DELETE route for the '/notes/:id' path
  const noteId = req.params.id; //Extract the ID of the note to be deleted from the request parameters

  fs.readFile(path.join(__dirname, '..', 'db', 'db.json'), (err, data) => { //Read the existing data from the db.json file
    if (err) throw err;

    const dbInput = JSON.parse(data); // Parse the data as JSON
    const filteredNotes = dbInput.filter(note => note.id !== noteId); //Filter out the note with the specified ID

    fs.writeFile(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(filteredNotes), (err) => { //Write the updated data back to the db.json file
      if (err) throw err;
      console.log('Successfully deleted note');
      res.status(204).end(); //Send a response indicating that the note was deleted successfully
    });
  });
});

module.exports = router; //Export the router 