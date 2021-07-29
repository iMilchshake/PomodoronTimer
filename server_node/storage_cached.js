// https://heynode.com/tutorial/readwrite-json-files-nodejs
const fs = require('fs')
const filePath = "storage.json"

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

// initialize cache
let cache;
readStorage((err, data) => {
    if (err) {
        console.error("error reading storage");
    } else {
        cache = data;
    }
})

exports.get = async function () {
    if (cache === undefined) {
        console.error("cache is empty");
    } else {
        return cache;
    }
}

exports.add = async function (obj) {
    cache.push(obj)

    fs.writeFile(filePath, JSON.stringify(cache), err => {
        if (err) console.error("Error writing file:", err);
    });
}