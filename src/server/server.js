/**
 * 
 * Require packages
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static('src/client'));

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('/client/views/index.html', { root: __dirname + '/..' })
    //res.sendFile('dist/index.html')
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => { console.log(`App is running on port ${port}`) });