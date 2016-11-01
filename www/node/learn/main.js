var fs = require("fs");

var data = fs.readFileSync("server.js");

console.log(data.toString());

console.log("end");

