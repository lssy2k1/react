let http = require("http");

http.createServer( (request, response) => {
    response.writeHead(200, {'Content-Type' : 'text/html'});//content-type {}는 이미 만들어져있는 json이다!
    response.end("<H1>Hello my first Webserver</H1>")
}).listen(3000, (request,response) => {
    console.log("server start http://127.0.0.1:3000")
});