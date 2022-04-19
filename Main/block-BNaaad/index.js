var path = require("path")
var os = require("os");
var fs = require("fs");
var url = require("url");
var {square,area} = require("./math")
const parsedUrl = url.parse(
  "https://blog.altcampus.io:80/students/register?name=altcampus&gender=male",
  true
);
const pathName = path.join(__dirname,"file.md");
const freeMem = os.freemem()
const cpu = os.cpus().length

const buff1 = Buffer.alloc(10);
buff1.write("Welcome to Buffer")
console.log(buff1.toString())
console.log(square(2),area(2,4))

console.log(parsedUrl.query);
console.log(os.uptime(),os.version());


console.log("first")
fs.readFile("../README.md", "utf8", (err,content) => {
    console.log(content.toString())
});

console.log("last")
