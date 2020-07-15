var path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

// Dependencies
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// Init main project folder
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// Endpoint for all routes
const allData = {}

// Set POST route
app.post('/destination', addDestination)

function addDestination(req, res) {
    allData.lat = req.body.lat
    allData.lon = req.body.lon
    allData.city = req.body.city
    allData.country = req.body.country
}

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})