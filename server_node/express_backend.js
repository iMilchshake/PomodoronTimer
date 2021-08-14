const express = require('express')
const storage = require('./storage_cached')
const statistics = require('./statistics')
const app = express()
const port = 3000

// enable json parser
app.use(express.json());

// initialize storage
// storage.initialize(); should now be implicated by import

// setup routes
app.get('/PomodoronTimer/api/data', (req, res) => {
    console.log("GET /PomodoronTimer/api/data");
    storage.get().then(data => {
        res.send({data: data})
    })
});

app.post('/PomodoronTimer/api/add', (req, res) => {
    console.log("POST /PomodoronTimer/api/add " + JSON.stringify(req.body));
    storage.add(req.body).then(() => {
        res.sendStatus(200);
    });
});

app.get('/PomodoronTimer/api/data/daycount', (req, res) => {
    console.log("GET /PomodoronTimer/api/data/daycount");
    statistics.daycount().then((stats) => {
        res.send(stats);
    })
});

app.get('/PomodoronTimer/api/data/timeSpend', (req, res) => {
    console.log("GET /PomodoronTimer/api/data/timeSpend");
    statistics.timeSpend().then((stats) => {
        res.send(stats);
    })
});


// invalid route
app.use(function (req, res) {
    res.send({
        status: 'error',
        error: 'invalid route!',
    });
});

// host server
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
