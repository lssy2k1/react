let http = require("http");

let server = http.createServer( (request, response) => {
    response.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});//한글 안꺠지게 하기.
    response.end("<H1>두번째 서버입니다.</H1>")
})

server.listen(4000, () => {
    console.log("server start http://127.0.0.1:4000")
});

//npm install nodemon