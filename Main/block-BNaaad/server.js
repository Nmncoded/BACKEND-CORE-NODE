
// var http = require("http");
// var server = http.createServer((req,res) => {
//     console.log(req.headers,req.method,req.url);
//     res.end("hi..")
// })
// server.listen(4000,() => {
//     console.log("server is listening on port 4000 ")
// })
// console.log(server)

// var http  = require("http");
// var server = http.createServer(handleRequests);
// var url = require("url");

// function handleRequests(req,res){
//     let parsedUrl = url.parse(req.url,true);
//     if(req.method === "GET" && parsedUrl.pathname === "/"){

//         res.end("welcome to home page")
//     }else if(req.method === "GET" && parsedUrl.pathname === "/about"){
//         res.writeHead(201,{"Content-Type":"text/html"})
//         res.end("<h2>this is all about NodeJS</h2>")
//     }else if(req.method === "POST" && parsedUrl.pathname === "/about"){
//         res.writeHead(201,{"Content-Type":"text/json"})
//         res.end("{message: this is a post request}")
//     }else{
//         res.writeHead(404,{"Content-Type":"text/plain"})
//         res.end("error404")
//     }
// }

// server.listen(5000,() =>{
//     console.log("server is listening on port 5000")
// })

// var http  = require("http");
// var server = http.createServer(handleRequests);
// var url = require("url");
// var fs = require("fs");
// let buff1 = Buffer.alloc("{success: true, message: 'Welcome to Nodejs'}".length);
// buff1.write("{success: true, message: 'Welcome to Nodejs'}")

// function handleRequests(req,res){
//     let parsedUrl = url.parse(req.url,true);

//     if(req.method === "GET" && parsedUrl.pathname === "/file"){
//         res.writeHead(201,{"Content-Type":"text/html"})
//         fs.readFile("./node.html",(err,content) =>{
//             if(err)console.log(err);
//             res.end(content)
//         })
//     }else if(req.method === "GET" && parsedUrl.pathname === "/stream"){
//         res.writeHead(201,{"Content-Type":"text/html"})
//         fs.createReadStream("./node.html").pipe(res)
//     }else if(req.method === "GET" && parsedUrl.pathname === "/json"){
//         res.writeHead(201,{"Content-Type":"text/json"})
//         res.end(buff1)
//     }else if(req.method === "GET" && parsedUrl.pathname === "/users"){
//         res.writeHead(201,{"Content-Type":"text/html"})
//         fs.createReadStream("./input.html").pipe(res)
//     }else{
//         res.writeHead(404,{"Content-Type":"text/plain"});
//         res.end("error404")
//     }

// }

// server.listen(5555,() =>{
//     console.log("server is listening on port 5555")
// })

// var http  = require("http");
// var server = http.createServer(handleRequests);
// var url = require("url");
// var fs = require("fs");

// function handleRequests(req,res){
//     let parsedUrl = url.parse(req.url,true);
//     res.writeHead(201,{"Content-Type":"text/json"})
//     // console.log(req.url,parsedUrl.query.email);
//     res.end(parsedUrl.query.email)
// }

// server.listen(5505,() =>{
//     console.log("server is listening on port 5505")
// })

// var http  = require("http");
// var server = http.createServer(handleRequests);
// var url = require("url");
// var fs = require("fs");

// function handleRequests(req,res){
//     let parsedUrl = url.parse(req.url,true);
//     if(req.method === "GET" && parsedUrl.pathname === "/"){
//         res.writeHead(201,{"Content-Type":"text/html"})
//         fs.createReadStream('./index.html').pipe(res)
//     }else if(req.url.split(".").pop() === "css"){
//         res.setHeader("Content-Type","text/css")
//         fs.createReadStream( `.${req.url}`).pipe(res)
//         // console.log(`.${req.url}`)
//     }else if(req.url.split(".").pop() === "js"){
//         res.setHeader("Content-Type","text/js")
//         fs.createReadStream( `.${req.url}`).pipe(res)
//         // console.log(`.${req.url}`)
//     }else if(req.url.split(".").pop() === "jpg"){
//         res.setHeader("Content-Type","image/jpg")
//         fs.createReadStream( `.${req.url}`).pipe(res)
//         // console.log(`.${req.url}`)
//     }else if(req.method === "GET" && parsedUrl.pathname === "/about"){
//         res.writeHead(201,{"Content-Type":"text/html"})
//         fs.createReadStream('./about.html').pipe(res)
//     }else{
//         res.statusCode = 404;
//         res.end("page not found!")
//     }
// }

// server.listen(5505,() =>{
//     console.log("server is listening on port 5505")
// })
var path = require("path");
var {EventEmitter} = require("events")
var joinedPath = path.join(__dirname, "./server.js")
var myEmitter = new EventEmitter();
var count = myEmitter.on('notice', (msg) => {
    console.log("my-emitter" + msg)
})
var xyz = myEmitter.emit('notice',"hllo-world")
console.log(count)
console.log(xyz)

// console.log(myEmitter.emit("notice"))
// console.log(myEmitter)
// console.log(__dirname)
// console.log(__filename)
// console.log(joinedPath)
