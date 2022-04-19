var path = require("path");
var indexJSRelPath = "/client/index.js"
var indexJSAbsPath = path.join(__dirname.split("server")[0], indexJSRelPath)
console.log( ".." + indexJSRelPath);
console.log(indexJSAbsPath);