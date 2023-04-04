var express = require("express")
var app = express(); //서버 만들었음.

app.use((req, res, next) => {
    //request 브라우저 -> 서버
    //response 서버 -> 브라우저
    //enxt 다음 함수를 호출한다.
    req.name = "홍길동";
    res.name = "john";
    console.log("첫번째 미들웨어");
    next();
});

app.use((req,res, next) => {
    console.log("두번째 미들웨어");
    req.phone = "000-0000-0000";
    res.address = "서울시 관악구";
    next();
});

app.use((request, response) => {
    console.log("세번째 미들웨어");
    response.writeHead(200, {"Content-type" : "text/html"});
    console.log(request.name);
    console.log(response.name);
    console.log(request.phone);
    console.log(response.address);
    response.end("<H1>Express</H1>")
});

app.listen(4000,() => {
    console.log("server start http://127.0.0.1:4000");
})