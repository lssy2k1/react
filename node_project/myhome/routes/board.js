var express = require('express');
var app = express();
var router = express.Router();
var commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");
app.use(express.urlencoded({extended:false}));

/* GET home page. */
router.get('/list/:pg', async function(req, res, next) {
  let pg = parseInt(req.params.pg); //페이징을 위해 추가
  //pg = 1 0부터 나와야함 (pg-1)*10
  //pg = 2 10부터 나와야함
  //pg = 3 20부터 나와야함
  let sql = `SELECT count(*) cnt
            FROM tb_board A
            LEFT OUTER JOIN (SELECT @rownum:=0) B ON 1=1
            LEFT OUTER JOIN tb_member C ON A.writer = c.userid
            `
  let results = await commonDB.mysqlRead(sql, []);
  let totalCnt =  results[0]["cnt"];

  sql = `SELECT A.id, A.title, A.writer, A.num, A.username
            ,date_format(A.wdate, '%Y-%m-%d') wdate
            FROM (SELECT A.id, A.title, A.writer, A.wdate, C.username
                        ,@rownum:=@rownum+1 num
                  FROM tb_board A
            LEFT OUTER JOIN (SELECT @rownum:=0) B ON 1=1
            LEFT OUTER JOIN tb_member C ON A.writer = c.userid
            ORDER BY id desc
            ) A
           LIMIT ${(pg-1)*10}, 10;`

  results = await commonDB.mysqlRead(sql, []);//이처럼 db접속(공통부분)을 빼놔야 코드가 간결해짐.
  res.render('board/board_list', {session : req.session
    , boardList : results 
    , totalCnt : totalCnt
    , pg : pg
    , paging : commonUtil.getPaging(pg, totalCnt)});
});

/* GET home page. */
// router.get('/', async function(req, res, next) {
//   let sql = `select id, title, writer, 
//                     contents, date_format(wdate, '%Y-%m-%d') wdate
//              from tb_board`
//   let results = await commonDB.mysqlRead(sql, []);//이처럼 db접속(공통부분)을 빼놔야 코드가 간결해짐.
//   res.render('board/board_list', {session : req.session, boardList : results });
// });

// router.get('/view/:id',async function(req, res, next){
//   let sql = `select id, title, writer, 
//             contents, date_format(wdate, '%Y-%m-%d') wdate
//             from tb_board`
//   let results = await commonDB.mysqlRead(sql, []);
//   let id = req.params.id;
//   let boardItem = results.find(board => board.id == id);
//   res.render("board/board_view", {board : boardItem});
// });

router.get('/view/:id',async function(req, res, next){//await가 있으니 async로 정의해줘.
  let id = req.params.id;
  let sql = `select id, title, writer, 
            contents, date_format(wdate, '%Y-%m-%d') wdate
            from tb_board
            where id='${id}'`
  let results = await commonDB.mysqlRead(sql, []);//commonDB.mysqlRead가 처리되기를 기다리고 할당해줘.
  let boardItem = results[0];
  console.log(typeof(boardItem));
  console.log(typeof(results));
  //let boardItem = results.find(board123 => board123.id == id);
  res.render("board/board_view", {board : boardItem});
});

router.use('/write',function(req, res){
  res.render("board/board_write");
});



module.exports = router;

//select * from tb_board where id=$'{id}'
//select * from tb_board whrer id=?, [id]