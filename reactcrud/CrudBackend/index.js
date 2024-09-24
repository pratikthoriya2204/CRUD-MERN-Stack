const connect = require("./db");
connect();

const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

app.use('/api/crud', require('./routes/crud'))

app.listen(port, () => {
    console.log(`our crud app is running on ${port}`);
})