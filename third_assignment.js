var express = require('express');
var app = express();
var fs = require('fs');
var ejs = require('ejs');

app.use("/scoreform", (req, res) => {
    fs.readFile("../html/third_assignment.html", "utf-8", (err, data) => {
        res.writeHead(200, {"Content-type":"text/html"});
        res.end(ejs.render(data));
    })
});

app.use("/score", (req, res) => {
    let name = req.query.name;
    let kor = parseInt(req.query.kor);
    let eng = parseInt(req.query.eng);
    let mat = parseInt(req.query.mat);
    let total = kor + eng + mat;
    let avg = total / 3;
    res.send({total : total, avg : avg});
    //res.send(`${name}님 총점 : ${total}, 평균 : ${avg}`);
});

app.use((request, response) => {
    response.writeHead(200, {"Content-type" : "text/html"});
    response.end("<H1>error</H1>")
});

app.listen(4000,() => {
    console.log("server start http://127.0.0.1:4000");
})