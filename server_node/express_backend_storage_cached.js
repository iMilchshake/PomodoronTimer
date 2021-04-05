// https://heynode.com/tutorial/readwrite-json-files-nodejs
const fs = require('fs')
const filePath = "storage.json"

let cache;

exports.initialize = function () {
    console.log("initializing storage")
    readStorage((err, data) => {
        if (err) {
            console.error("error reading storage");
            return;
        } else {
            cache = data;
        }
    })
}

exports.get = async function () {
    return cache;
}

const readStorage = function (cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        } catch (err) {
            return cb && cb(err);
        }
    });
}

exports.add = async function (obj) {
    cache.push(obj)

    fs.writeFile(filePath, JSON.stringify(cache), err => {
        if (err) console.error("Error writing file:", err);
    });
}

//
// exports.addToStorage = function (obj) {
//     // read current data
//     exports.readStorage((err, data) => {
//         if (err) {
//             console.log("Error reading file:", err);
//             return;
//         }
//
//         // add new obj
//         data.push(obj);
//
//         // write new data to file
//         fs.writeFile(filePath, JSON.stringify(data), err => {
//             if (err) console.log("Error writing file:", err);
//         });
//     });
// }

// jsonReader("storage.json", (err, data) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(data);
// });