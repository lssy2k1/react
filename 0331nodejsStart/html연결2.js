var express = require("express")
var fs = require("fs");
var ejs = require("ejs");

var app = express(); //서버 만들었음.

app.use(express.urlencoded({extended:false}));

app.get("/guguform", (req, res) => {
    fs.readFile("../html/guguform.html", "utf-8", (err, data) => {
        res.writeHead(200, {"Content-type" : "text/html"});
        res.end(ejs.render(data));
    })
})

app.get("/gugu", (req,res) => {
    let x = parseInt(req.query.dan);
    let result = "";
    for(let i = 1 ; i < 10 ; i++){
        result += `<p style = "color : blue; font-size:30pt; border : 1px solid red">${x} * ${i} = ${x*i}</p>`;
    }
    res.send(result);
})

app.get("/calcform", (request, response) => {
    fs.readFile("../html/calcform.html", "utf-8", ((err, data) => {
        response.writeHead(200, {"Content-type" : "text/html"});
        response.end(ejs.render(data))
    }))
});

app.get("/calc", (req, res) => {
    let x = parseInt(req.query.x);
    let y = parseInt(req.query.y);
    let operator = parseInt(req.query.operator);

    if (operator =="1"){
        res.send(`${x} + ${y} = ${x+y}`);
    } else if (operator =="2"){
        res.send(`${x} - ${y} = ${x-y}`);
    } else if (operator =="3"){
        res.send(`${x} * ${y} = ${x*y}`);
    } else {
        res.send(`${x} / ${y} = ${x/y}`);
    } 
})

app.use((request, response) => {
    response.writeHead(200, {"Content-type" : "text/html"});
    response.end("<H1>error</H1>")
});

app.listen(4000,() => {
    console.log("server start http://127.0.0.1:4000");
})