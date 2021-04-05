const express = require('express')
const storage = require('./express_backend_storage_cached')
const app = express()
const port = 3000

// enable json parser
app.use(express.json());

// initialize storage
storage.initialize();

// setup routes
app.get('/PomodoronTimer/api/data', (req, res) => {
    console.log("get");
    storage.get().then(data => {
        res.send({data: data})
    })
})

app.post('/PomodoronTimer/api/add', (req, res) => {
    console.log("adding: " + JSON.stringify(req.body));
    storage.add(req.body).then(() => {
        res.sendStatus(200)
    });
})

// host server
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
