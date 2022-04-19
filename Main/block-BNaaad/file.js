var http = require("http");
var fs = require("fs")
var server = http.createServer(handleRequests);
var resp; 


function handleRequests(req,res){
    // resp = res;
    fs.createReadStream("./readme.txt").pipe(res)
    // res.end("welcome")
}
// console.log(fs.createReadStream("./readme.txt").pipe(resp));

server.listen(5555,() => {
    console.log("server is listening on port 5555")
})
