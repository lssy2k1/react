var express = require('express');//node_modules 폴더에 있으면 경로를 안써도 됨.
var router = express.Router();
var commonDB = require("./commonDB");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('member/member_register', { title: 'Express' });//ejs파일 <%=title%>로 정의된 곳에 'Express'를 할당하겠다.
});

//아이디 중복체크 -- 클라이언트로부터 id를 받는다.
//                   받아온 아이디를 db에서 존재하는지 유무 확인.
//                   존재하면 fail을 사용자에게 보여주고, 사용가능하면 success를 반환.(json으로 반환)
router.use('/idcheck', async function(req, res, next) {
  let userid = req.body.userid; //사용자단에서 userid
  let sql = `select count(*) cnt from tb_member where userid = '${userid}'`;
  let rows = await commonDB.mysqlRead(sql);
  let cnt = rows[0]["cnt"];
  //console.log(rows);
  //console.log(cnt);
  if(cnt == 0){
    res.json({"result" : "success"});
  } else {
    res.json({"result" : "fail"});
  }
});

// /member/save
router.use('/save', async function(req, res, next){
  let userid = req.body.userid;
  let password = req.body.password;
  let username = req.body.username;
  let email = req.body.email;
  let phone = req.body.phone;
  let zipcode = req.body.zipcode;
  let address1 = req.body.address1;
  let address2 = req.body.address2;
  let nickname = req.body.nickname;
  let sql = `insert into tb_member (userid, password,username, email, phone,
             zipcode, address1, address2, nickname, wdate) values (?,?,?,?,?,?,?,?,?,now())`
try {
  await commonDB.mysqlRead(sql, [userid, password, username, email, phone, zipcode, address1, address2, nickname]);
  res.json({"result" : "success"});
}
catch (e) {
  console.log(e);
  res.json({"result" : "fail"});
}
});

// /member/login
router.get('/login', async function(req, res, next){
  res.render("member/member_logon")
});

router.post('/login', async function(req,res,next){//같은 /login이지만 get, post로 구분.
  let userid = req.body.userid;
  let password = req.body.password;
  let sql = `select * from tb_member where userid = '${userid}'`
  let results = await commonDB.mysqlRead(sql);
  if (results.length == 0){
    res.json({"result" : "fail", msg : "아이디가 없습니다."})
    return;
  }
  if (results[0]["PASSWORD"] != password){
    res.json({"result" : "fail", msg : "패스워드가 일치하지 않아요"});
    return;
  }

  req.session["username"] = results[0]["username"];
  req.session["userid"] = results[0]["userid"];
  req.session["email"] = results[0]["email"];
  console.log(req.session["username"])
  console.log(req.session["userid"])
  console.log(req.session["email"])
  res.json({"result" : "success", msg : "로그인 성공"});
})



// // /member/logon 내가 만들어 본 것.
// router.use('/logon', async function(req, res, next){
//   let userid = req.body.userid;
//   let password = req.body.password;

//   let sql = `select userid, PASSWORD from tb_member where userid = '${userid}'`
//   let sqlread = await commonDB.mysqlRead(sql)
//   //let useridsql = sqlread[0];
// //실수했던 부분 : sql구문에서 변수에 ''안붙임. sql구문에서 "컬럼명"으로 검색해야 오류 안남.
//   console.log(sqlread[0]["PASSWORD"]);
//   console.log(password);
//   try {
//     if (password == sqlread[0]["PASSWORD"]){
//       console.log("일치");
//       res.json({"result" : "success"});
//     } else{
//       console.log("불일치");
//       res.json({"result": "pwfail"});
//     }
//     }
//   catch(e){
//     console.log(e);
//     res.json({"result" : "idfail"});
//   };
// });

router.use('/logOut', async function(req, res, next){
  req.session["userid"]="";
  req.session["username"]="";
  req.session["email"]="";//세션 지우는 방법.
  res.redirect('/');//로그아웃하고나면 index로 이동
  //req.session.destroy();//세션 파괴. 둘중 하나만 하면 됨.
})


router.get('/put', async function(req, res, next){
  let userid = req.query.userid;
  console.log("***************************")
  console.log( req.session );
  req.session["userid"]=userid;
  //res.redirect("/");
  console.log(req.session["userid"]);
})

module.exports = router;
