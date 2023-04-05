const express = require('express'); // Import the Express framework
const app = express(); // Create a new Express application

const indexRouter = require('./routes/index'); // Import the router for the index path
const notesRouter = require('./routes/notes'); // Import the router for the '/notes' path

app.use(express.json()); // Set up middleware to parse JSON data in requests
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', notesRouter); //Mount the notesRouter on the notes path
app.use('/', indexRouter); //Mount the indexRouter on the index path

const PORT = process.env.PORT || 3001; //Set port with Heroku default

app.listen(PORT, () => { // Start the server and log a message to the console when it's ready
  console.log(`App listening at http://localhost:${PORT}`);
});