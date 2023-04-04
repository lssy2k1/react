var express = require("express")
var app = express(); //서버 만들었음.

app.get("/gugu", (req,res) => {
    let i = req.query.dan;
    let result = ""//문장을 한번에 만들어서 보내야한다.
    for (j = 1 ; j < 10 ; j++){
        result += `${i} * ${j} = ${i * j}<br/>`
    }
    console.log( result );
    res.writeHead(200, {"Content-type" : "text/html"});
    res.end(result);
    //res.end("hello");//res.end를 두번 하면 오류나. 왜 end를 두번 보내?
})

//http://127.0.0.1:4000/gugu/4
app.get("/gugu/:dan", (req,res) => {
    let i = req.params.dan;
    let result = ""
    for (j = 1 ; j < 10 ; j++){
        result += `${i} * ${j} = ${i * j}<br/>`//왜 parseInt를 안해? +는 문자열도 더하지만 *는 자동형전환해.
    }
    console.log( result );
    res.writeHead(200, {"Content-type" : "text/html"});
    res.end(result);
})

app.use((request, response) => {
    response.writeHead(200, {"Content-type" : "text/html"});
    response.end("<H1>Express</H1>")
});

app.listen(4000,() => {
    console.log("server start http://127.0.0.1:4000");
})