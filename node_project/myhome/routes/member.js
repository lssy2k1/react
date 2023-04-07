var express = require('express');//node_modules 폴더에 있으면 경로를 안써도 됨.
var router = express.Router();
var commonDB = require("./commonDB");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('member/member_register', { title: 'Express' });
});

//아이디 중복체크 -- 클라이언트로부터 id를 받는다.
//                   받아온 아이디를 db에서 존재하는지 유무 확인.
//                   존재하면 fail을 사용자에게 보여주고, 사용가능하면 success를 반환.(json으로 반환)
router.use('/idcheck', async function(req, res, next) {
  let userid = req.body.userid; //사용자단에서 userid
  let sql = `select count(*) cnt from tb_member where userid = '${userid}'`;
  let rows = await commonDB.mysqlRead(sql);
  let cnt = rows[0]["cnt"];
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
router.use('/login', async function(req, res, next){
  res.render("member/member_logon")
});

// /member/logon
router.use('/logon', async function(req, res, next){
  let userid = req.body.userid;
  let password = req.body.password;
  let sql = `select userid, password from tb_member where userid = ${userid}`
  try {
    console.log("******************")
    sqlread = await commonDB.mysqlRead(sql)
    console.log("가져옴");
    if (password == sqlread[0][1]){
      res.json({"result" : "success"});
    }
      res.json({"result": "fail"});
    }
  catch(e){
    console.log(e);
    res.json({"result" : "fail"});
  };
});

router.get('/put', async function(req, res, next){
  let userid = req.query.userid;
  console.log("***************************")
  console.log( req.session );
  req.session["userid"]=userid;
  //res.redirect("/");
  console.log(req.session["userid"]);
})

module.exports = router;
