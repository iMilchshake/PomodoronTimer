const express = require('express')
const storage = require('./express_backend_storage')
const app = express()
const port = 3000

// enable json parser
app.use(express.json());

// setup routes
app.get('/api/data', (req, res) => {
    storage.readStorage((err, data) => {
        res.send({data: data})
    })
})

app.post('/api/add', (req, res) => {
    storage.addToStorage(req.body);
    console.log(req.body);
    res.sendStatus(200);
})

// host server
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
