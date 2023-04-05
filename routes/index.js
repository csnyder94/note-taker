const path = require('path'); //Require router path
const router = require('express').Router(); //Use Router to define routes

router.get('/notes', (req, res) => { //Get route for notes
  res.sendFile(path.join(__dirname, '..', 'public', 'notes.html'));
});

router.get('*', (req, res) => { //Change route for index
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = router; //Export the router module