var express = require("express");
var app = express();//서버 만들었음
var fs = require("fs");
var ejs = require("ejs");

//ejs엔진은 views 폴더 아래서 파일을 검색한다.
app.set("view engine", ejs);
app.use(express.urlencoded({extended:false}));//body-parser 사용

let boardList = [
    {id:1, title:"제목1",writer:"작성자1",wdate:"2023-04-04"},
    {id:2, title:"제목2",writer:"작성자2",wdate:"2023-04-05"},
    {id:3, title:"제목3",writer:"작성자3",wdate:"2023-04-06"},
    {id:4, title:"제목4",writer:"작성자4",wdate:"2023-04-07"},
    {id:5, title:"제목5",writer:"작성자5",wdate:"2023-04-08"},
  ];

app.use("/board/list", (req,res) => {
    res.render("board/board_list.ejs", {boardList:boardList});
})

app.use("/board/view/:id", (req,res) => {
    let id = req.params.id;
    let item = boardList.filter(x => x.id==id);
    res.render("board/board_view.ejs", {item:item[0]});
})
//페이지만 이동한다. board_write.ejs로 이동만한다.
app.use("/board/write", (req,res) => {
    res.render("board/board_write.ejs");
})

//저장한다.
app.use("/board/save", (req,res) => {
    let title = req.body.title;
    let contents = req.body.contents;
    let writer = req.body.writer;
    let id = boardList.length+1;
    console.log(id)
    boardList.push({id:id, title:title, contents:contents, writer:writer});
    console.log(id)
    res.redirect("/board/list");//강제이동
    //웹에서는 어떠한 경우에도 직접 호출하면 안돼(중간중간 숨어있는 함수가 많다). 그러니 페이지를 이동하자.
})
app.use((request, response) => {
    response.writeHead(200, {"Content-type" : "text/html"});
    response.end("<H1>error</H1>")
});

app.listen(4000,() => {
    console.log("server start http://127.0.0.1:4000");
})