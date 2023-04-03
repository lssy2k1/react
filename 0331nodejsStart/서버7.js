let http = require("http");
let fs = require("fs");
let ejs = require("ejs"); //npm install ejs

let server = http.createServer( (request, response) => {
    response.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});

    fs.readFile("./html/test.html", "utf-8", (error, data) => {
        if (error){
            response.writeHead(500, {'Content-Type' : 'text/html;charset=utf-8'});
            response.end("error");//에러상황임.
            return;
        }
        response.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
        response.end(ejs.render(data, {//test에서  <%=name%>을 바꿔치기해서 넣어줄 것임.
            name : "홍길동",
            age : "23",
            address : "서울시 관악구",
            limit : 10

        }));//파일 내용을 브라우저로 보낸다.
        //ejs 템플릿 엔진을 통해서 html과 nodejs의 데이터를 결합한다.
    })
})

server.listen(4000, () => {
    console.log("server start http://127.0.0.1:4000")
});

//npm install nodemon