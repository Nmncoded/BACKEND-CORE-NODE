var http = require("http");
var server = http.createServer(handleRequests);
var fs = require("fs");
var queryString = require("querystring");
var url = require("url");

function handleRequests(req,res){
    var parsedUrl = url.parse(req.url,true),store = "",contentType = req.headers["content-type"] ;
    req.on("data",(chunk) => {
        store += chunk;
    })
    req.on("end",() => {
        // console.log(store)
        if(req.method === "POST" && parsedUrl.pathname === "/form"){
            var parsedData = queryString.parse(store);
            res.writeHead(201,{"Content-Type":"text/html"});
            res.end(`<h2>Name: ${parsedData.name}</h2> <h3>Email: ${parsedData.email}</h3> <p>Age: ${parsedData.age}</p>`)
        }
    })
    if(req.method === "GET" && parsedUrl.pathname === "/form"){
        res.writeHead(201,{"Content-Type":"text/html"});
        fs.createReadStream("./form.html").pipe(res)
    }else if( req.url.split(".").pop() === "css" ){
        res.setHeader("Content-Type","text/css");
        fs.createReadStream( `.${req.url}`).pipe(res)
    }
    
}

server.listen(5678, () => {
    console.log("server is listening on port 5678")
})