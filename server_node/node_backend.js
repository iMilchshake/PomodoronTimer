const http = require('http');

console.log('starting server.')

http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "application/json"});

    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        console.log("data:", data);
    })

    const route = req.url;
    let res_obj;

    switch (route) {
        case "/dummy":
            console.log("dummy requested");
            res_obj = {
                status: 200,
                data: "dummy lel"
            };
            break
        default:
            console.log("invalid route");
            res_obj = {
                status: 404,
                data: route + "not found",
            };
            break
    }
    console.log(res_obj);
    res.end(JSON.stringify(res_obj));
}).listen(3000);







