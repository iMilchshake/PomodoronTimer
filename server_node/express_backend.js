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
    console.log("GET /PomodoronTimer/api/data");
    storage.get().then(data => {
        res.send({data: data})
    })
})

app.post('/PomodoronTimer/api/add', (req, res) => {
    console.log("POST /PomodoronTimer/api/add " + JSON.stringify(req.body));
    storage.add(req.body).then(() => {
        res.sendStatus(200);
    });
})

app.get('/PomodoronTimer/api/data/daycount', (req, res) => {
    console.log("GET /PomodoronTimer/api/data/daycount");

    storage.get().then(data => {
        data = data.map(timeObj => {
            return (new Date(timeObj.start).getDay());
        })

        let counts = {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "0": 0
        };

        data.forEach((el) => {
            counts[el] = counts[el] ? (counts[el] += 1) : 1;
        });

        res.send(Object.values(counts));
    })
});

// invalid route
app.use(function(req, res){
    res.send({
        status: 'error',
        error: 'invalid route!',
    });
});

// host server
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
