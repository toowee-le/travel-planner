const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Dependencies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Init main project folder
app.use(express.static("dist"));

// Create empty object to save API data
let projectData = [];

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// Add new trip entry to the server
app.post("/addEntry", (req, res) => {
  const entry = req.body;
  projectData.push(entry);
});

// Delete trip entry from the server
app.post("/delete", (req, res) => {
  let { id } = req.body;
  projectData = projectData.filter((trip) => trip.id !== id);
});

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

// For testing
const add = (a, b) => a + b;

module.exports = add;
