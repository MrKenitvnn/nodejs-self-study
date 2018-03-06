var http = require("http");
var fs = require("fs");

http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/html'});

   var user = "Data ";
   var html = fs.readFileSync(__dirname + "/index.html", "utf-8");
   html = html.replace("{user}", user);

   res.end(html);

}).listen(1334, "127.0.0.1");

