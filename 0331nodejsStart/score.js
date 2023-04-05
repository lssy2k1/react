var express = require("express")
var app = express(); //서버 만들었음.
var fs = require('fs');
var ejs = require('ejs');
app.set("view engine", ejs);
app.use(express.urlencoded({extended:false}));

let scoreData = [       //데이터로 사용한다.
    {id : 1, name : "홍길동", kor : 90, eng : 80, mat : 100},
];

//url은 서버 전체에서 유일해야한다. score/lilst
app.get("/score/list", (req,res) => {
    //views/score/score_list.ejs
    //express framework가 디자인 파일들은 views폴더에 놓기로 약속
    //response객체에 render라는 함수를 express가 추가.
    //첫번째 매개변수 : html파일
    //두번째 매개변수 : 데이터를 JSON형태로 전달해야한다.
    //이 두개를 합해서 새로운 문서를 만들어 클라이언트로 전달한다.
    //nodejs에서는 파일 읽고 ejs렌더링 end로 보내기 세가지 절차가 있음.
    //express에만 render함수가 있음. 이는 위 세가지 작업을 한번에 해줌.
    res.render("score/score_list.ejs", {scoreList:scoreData}); //ejs엔진에서 scoreList로 데이터를 받겠다.
});

app.get("/score/view/:id", (req,res) => {
    let id = req.params.id;
    //filter는 해당 조건을 만족하는 모든 데이터를 배열로 반환.
    //find는 조건을 만족하는 첫번째 데이터만 반환.(배열 아님.)
    let scoreItem = scoreData.find(score => score.id == id);
    res.render("score/score_view.ejs", {score : scoreItem});
});

app.get("/score/write", (req,res) => {
    res.render("score/score_write.ejs");
});

app.post("/score/save", (req,res) => {
    let name = req.body.name;
    let kor = parseInt(req.body.kor);
    let eng = parseInt(req.body.eng);
    let mat = parseInt(req.body.mat);
    let id = scoreData[scoreData.length-1].id + 1;
    //제일 마지막에 있는 데이터의 id+1을 한다.
    let data = {name, kor, eng, mat, id};
    //JSON으로 데이터를 만들어서 배열에 추가한다.
    scoreData.push(data);
    //redirect함수를 이용하여 재접근
    res.redirect("/score/list");
})

app.use("/", (req,res) => {     //ip주소 뒤에 아무것도 없는.
    res.render("index.ejs");
})

app.use((request, response) => {
    response.writeHead(200, {"Content-type" : "text/html"});
    response.end("<H1>Express</H1>")
});

app.listen(4000,() => {
    console.log("server start http://127.0.0.1:4000");
})