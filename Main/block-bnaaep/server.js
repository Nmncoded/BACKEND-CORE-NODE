var http = require("http");
var server = http.createServer(handleRequests);
var path = require("path")
var url =  require("url");
var fs = require("fs");
var qs = require("querystring");
var pathOfContacts = path.join(__dirname,"contacts/");
console.log(pathOfContacts)

function handleRequests(req,res){
    var store = "",contentType = req.headers["content-type"];
    var parsedUrl = url.parse(req.url,true)
    // console.log(req.url)
    req.on("data",(chunk) => {
        store += chunk;
    })
    req.on("end",() => {
        if(req.method === "GET" && parsedUrl.pathname === "/" ){
            res.writeHead(201,{"Content-Type" : "text/html"})
            fs.createReadStream("./index.html").pipe(res);
        }else if(req.method === "GET" && parsedUrl.pathname === "/about" ){
            res.writeHead(201,{"Content-Type" : "text/html"})
            fs.createReadStream("./about.html").pipe(res);
        }else if (req.url.split(".").pop() === "css"){
            res.writeHead(201,{"Content-Type" : "text/css"})
            fs.createReadStream(`.${req.url}`).pipe(res);
        }else if (req.url.split(".").pop() === "jpg" || req.url.split(".").pop() === "png" ){
            res.writeHead(201,{"Content-Type" : `image/${req.url.split(".").pop()}`})
            fs.createReadStream(`.${req.url}`).pipe(res);
        }else if(req.method === "GET" && parsedUrl.pathname === "/contact" ){
            res.writeHead(201,{"Content-Type" : "text/html"})
            fs.createReadStream("./form.html").pipe(res);
        }else if(req.method === "POST" && parsedUrl.pathname === "/form" ){
            var parsedData = qs.parse(store);
            fs.open(pathOfContacts + `${parsedData.username}.json`, "wx", (err,fd) => {
                if(err){
                    res.setHeader("Content-Type" , "text/html")
                    return res.end(`<h1>${parsedData.username} already taken</h1>`)
                }else{
                    fs.writeFile(fd, JSON.stringify(parsedData) ,(err) => {
                        if(err)return console.log(err);
                        fs.close(fd, (err) => {
                            if (err)
                              console.error('Failed to close file', err);
                            else {
                              console.log("File Closed successfully");
                              res.setHeader("Content-Type" , "text/html")
                              res.end(`<h1>${parsedData.username} successfully saved</h1>`);
                            }
                          });
                    })
                }
                
            })

        }else if( parsedUrl.pathname === "/form" && req.method === "GET" ){
            var username = parsedUrl.query.username;
            fs.createReadStream(pathOfContacts + `${username}.json`).pipe(res)
        }else if (parsedUrl.pathname === "/form" && req.method === "DELETE") {
            var username = parsedUrl.query.username;
            fs.unlink(pathOfContacts + `${username}.json`, (err) => {
                if(err){
                    return res.end(err)
                }else{

                    res.end(`${username} is deleted`);
                }
            });
        }else if (parsedUrl.pathname === "/form" && req.method === "PUT") {
            var username = parsedUrl.query.username;
            fs.open( pathOfContacts + `${username}.json`, "r+" ,(err,file) => {
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
        }else if( req.method === "GET" && parsedUrl.pathname === "/users" ){
            var allFiles = fs.readdirSync(pathOfContacts)
            function loopOver(){
                let li = ``;
                for(let i=0;i<allFiles.length;i++){
                    li = li + `<li>username : ${allFiles[i].split(".")[0]}</li>`
                }
                return `<ul>${li}</ul>`;
            }
            res.setHeader("Content-Type" , "text/html")
            res.end(loopOver())
        }else{
            res.statusCode = 404
            res.end("page not found")
        }
    })
}

server.listen(5000,() => {
    console.log("server is listening on port 5000")
})