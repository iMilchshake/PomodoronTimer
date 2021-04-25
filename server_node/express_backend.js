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

app.get('/PomodoronTimer/api/data/daycount', (req, res) => {
    console.log("daycount stat was requested");

    storage.get().then(data => {
        data = data.map(timeObj => {
            return (new Date(timeObj.t_start).getDay());
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

// host server
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
