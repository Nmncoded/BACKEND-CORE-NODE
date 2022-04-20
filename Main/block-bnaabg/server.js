var http = require("http");
var server = http.createServer(handleRequests);
var path = require("path")
var url =  require("url");
var fs = require("fs");
var PathOfUsers = path.join(__dirname,"users/");
console.log(PathOfUsers)

function handleRequests(req,res){
    var store = "",contentType = req.headers["content-type"];
    var parsedUrl = url.parse(req.url,true)
    
    req.on("data",(chunk) => {
        store += chunk;
    })
    req.on("end",() => {
        if(req.method === "POST" && parsedUrl.pathname === "/users" ){
            var username = JSON.parse(store).username;
            // console.log(store);
            fs.open(PathOfUsers + `${username}.json`,"wx",(err,file) => {
                if(err) return console.log(err);
                // console.log(file)
                fs.writeFile(file,store,(err) => {
                    if(err) return console.log(err);
                    // console.log("written successfully");
                    fs.close(file, (err) => {
                        if (err)
                          console.error('Failed to close file', err);
                        else {
                          console.log("File Closed successfully");
                          res.end(`${username} successfully created`);
                        }
                      });
                })
            })
        }else if( parsedUrl.pathname === "/users" && req.method === "GET" ){
            var username = parsedUrl.query.username;
            fs.createReadStream(PathOfUsers + `${username}.json`).pipe(res)
        }else if (parsedUrl.pathname === "/users" && req.method === "DELETE") {
            var username = parsedUrl.query.username;
            fs.unlink(PathOfUsers + `${username}.json`, (err) => {
                if (err) return console.log(err);
                res.end(`${username} is deleted`);
            });
        }else if (parsedUrl.pathname === "/users" && req.method === "PUT") {
            var username = parsedUrl.query.username;
            fs.open( PathOfUsers + `${username}.json`, "r+" ,(err,file) => {
                fs.ftruncate(file,(err) => {
                    if (err) return console.log(err);
                    fs.writeFile(file, store, (err) => {
                        if(err) return console.log(err);
                        fs.close(file, (err) => {
                            if (err)
                              console.error('Failed to close file', err);
                            else {
                              console.log("File Closed successfully");
                              res.end(`${username} updated successfully`);
                            }
                      });
                    })
                })
            } )
        }else{
            res.statusCode = 404
            res.end("page not found")
        }
    })
}

server.listen(1234,() => {
    console.log("server is listening on port 1234")
})