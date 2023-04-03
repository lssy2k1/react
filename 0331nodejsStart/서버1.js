let http = require("http");

http.createServer( (request, response) => {//크리에이트서버가 완성되면 리턴함수가 호출됨.
    response.writeHead(200, {'Content-Type' : 'text/html'});//content-type {}는 이미 만들어져있는 json이다!
    response.end("<H1>Hello my first Webserver</H1>")
}).listen(3000, (request,response) => {
    console.log("server start http://127.0.0.1:3000")
});