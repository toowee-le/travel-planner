var path = require('path')
const express = require('express')
const app = express()

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/location', (req, res) => {
    console.log('received')
    console.log(req.body)
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})