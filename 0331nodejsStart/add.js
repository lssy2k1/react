var express = require("express")
var fs = require("fs");
var ejs = require("ejs");

var app = express(); //서버 만들었음.

app.use(express.urlencoded({extended:false}));

app.get("/addform", (request, response) => {
    fs.readFile("../html/addform.html", "utf-8", (err, data) => {
    response.writeHead(200, {"Content-type" : "text/html"});
    response.end(ejs.render(data))
    })
});

app.get("/add", (request, response) => {
    let x = parseInt(request.query.xname);
    let y = parseInt(request.query.yname);
    // result = x + y
    // response.end(result.toString());
    result = `${x} + ${y} = ${x+y}`;
    response.send(result);
    });

app.use((request, response) => {
    response.writeHead(200, {"Content-type" : "text/html"});
    response.end("<H1>Express</H1>")
});

app.listen(4000,() => {
    console.log("server start http://127.0.0.1:4000");
})