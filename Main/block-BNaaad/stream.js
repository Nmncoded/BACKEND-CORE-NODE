var http = require("http");
var server = http.createServer(handleRequests);
var server2 = http.createServer(handleRequests2);
var path = require("path")
var queryString = require("querystring");
console.log(__dirname + "/stream.js");
console.log(__dirname + "/server.js");
console.log(path.join(__dirname,"./index.html"))

// function handleRequests(req,res){
//     let store = "",contentType = req.headers["content-type"]
//     req.on("data", (chunk) =>{
//         // console.log(chunk)
//         store += chunk;
//     })
//     req.on("end", () =>{
//         if(req.method === "POST" && req.url === "/json"){
//             // console.log(store);
//             res.end(store)
//         }
//         if(req.method === "POST" && req.url === "/form"){
//             // console.log(queryString.parse(store));
//             var parsedData = queryString.parse(store)
//             res.end(JSON.stringify(parsedData))
//         }
//     })
// }

function handleRequests(req,res){
    let store = "",contentType = req.headers["content-type"]
    req.on("data",(chunk) =>{
        store += chunk;
    })
    req.on("end",() => {
        if(contentType === "application/json"){
            console.log(store);
            res.setHeader("Content-Type","text/html")
            res.end()
        }
        if(contentType === "application/x-www-form-urlencoded"){
            var parsedData = queryString.parse(store)
            res.end(JSON.stringify(parsedData))
        }
    })
}

server.listen(9000,() => {
    console.log("server is listening on port 9000")
})

function handleRequests2(req,res){
    let store = "",contentType = req.headers["content-type"]
    req.on("data",(chunk) =>{
        store += chunk;
    })
    req.on("end",() => {
        if(contentType === "application/json"){
            var parsedData = JSON.parse(store);
            res.setHeader("Content-Type","text/html")
            res.end(`<h1>${parsedData.email}</h1><h2>${parsedData.name}</h2>`)
        }
        if(contentType === "application/x-www-form-urlencoded"){
            var parsedData = queryString.parse(store)
            res.end(`<h2>${parsedData.email}</h2>`)
        }
    })
}

server2.listen(4000,() => {
    console.log("server is listening on port 4000")
})