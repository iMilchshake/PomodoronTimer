const express = require('express')
// const expressWinston = require('express-winston');
// const winston = require('winston'); // for transports.Console

const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

const storage = require('./storage_cached')
const statistics = require('./statistics')

const app = express()
const port = 3000

// enable json parser
app.use(express.json());

// initialize storage
// storage.initialize(); should now be implicated by import
// const tsFormat = () => (new Date()).toLocaleTimeString();
// const tsFormat = () => (new Date()).getTimezoneOffset();
// const myFormat = winston.format.printf(({ level, message, timestamp }) => {
//     return `${timestamp} [${level}]: ${message}`;
// });

// app.use(expressWinston.logger({
// //     transports: [
// //         new (winston.transports.Console)({
// //             timestamp: tsFormat,
// //             colorize: true,
// //             level: 'info'
// //         }),
// //         new (winston.transports.File)({
// //             filename: 'somefile.log',
// //             level: 'error'
// //         })
// //     ],
// //     format: winston.format.combine(
// //         winston.format.label({ label: 'right meow!' }),
// //         winston.format.timestamp(),
// //         myFormat
// //     ),
// // }));

// setup the logger
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}))
app.use(morgan('combined'))

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
