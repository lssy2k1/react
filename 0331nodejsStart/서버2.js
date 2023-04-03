let http = require("http");

let server = http.createServer( (request, response) => {
    //브라우저에서 http://127.0.0.1:4000 서버로 엑세스 요청이 들어오면
    //request객체 : 브라우저에서 요청한 정보를 담아오는 객체
    //response객체 : 서버에서 클라이언트로 정보를 보낼 때 여기에 담아보낸다.
    //
    response.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});//한글 안꺠지게 하기.
    response.end("<H1>두번째 서버입니다.</H1>")
})

server.listen(4000, () => {
    console.log("server start http://127.0.0.1:4000")
});

//npm install nodemon