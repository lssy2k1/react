let http = require("http");
let fs = require("fs");//파일읽기
let url = require("url");//url분석을 위한 라이브러리

//http://127.0.0.1:4000/add?x=4&y=5
//http://127.0.0.1:4000/sub?x=4&y=5
//http://127.0.0.1:4000/userinfo?userid=test&username=Tom


let server = http.createServer( (request, response) => {
    //console.log(request);
    //console.log( request.url );//전송 url
    console.log( request.method);//전송방식

    //정보를 보내는 건 규격을 따라야하고, 해석?하는건 언어마다 다르다.

    let rurl = request.url;
    let pathname = url.parse(rurl, true).pathname;//add
    let query = url.parse(rurl,true).query;//{x:4, y:5}
    //string 분석 -> json 객체로 전환
    //파싱한다.
    console.log(query);
    console.log(pathname);
    console.log(typeof(query));


    //request, response 사용법을 익히는 것이 중요하다.
    if ( pathname == "/add"){
        response.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
        response.end(`${query.x} + ${query.y} = ${parseInt(query.x) + parseInt(query.y)} `);
    }else if ( pathname == "/sub"){
        response.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
        response.end(`${query.x} - ${query.y} = ${parseInt(query.x) - parseInt(query.y)} `);
    }else if ( pathname == "/userinfo"){
        response.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
        response.end(`아이디 : ${query.userid} 이름 : ${query.username} `);
    }else{
        response.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'});
        response.end("<h1>존재하지 않는 url입니다.</h1>");
    }




})

server.listen(4000, () => {
    console.log("server start http://127.0.0.1:4000")
});

//npm install nodemon