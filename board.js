var express = require('express');
var app = express();
var router = express.Router();
var commonDB = require("./commonDB");
app.use(express.urlencoded({extended:false}));

/* GET home page. */
router.get('/', async function(req, res, next) {
  let sql = `select id, title, writer, 
                    contents, date_format(wdate, '%Y-%m-%d') wdate
             from tb_board`
  let results = await commonDB.mysqlRead(sql, []);//이처럼 db접속(공통부분)을 빼놔야 코드가 간결해짐.
  res.render('board/board_list', { boardList : results });
});

// router.get('/view/:id',async function(req, res, next){
//   let sql = `select id, title, writer, 
//             contents, date_format(wdate, '%Y-%m-%d') wdate
//             from tb_board`
//   let results = await commonDB.mysqlRead(sql, []);
//   let id = req.params.id;
//   let boardItem = results.find(board => board.id == id);
//   res.render("board/board_view", {board : boardItem});
// });

router.get('/view/:id',async function(req, res, next){
  let id = req.params.id;
  let sql = `select id, title, writer, 
            contents, date_format(wdate, '%Y-%m-%d') wdate
            from tb_board
            where id=${id}`
  let results = await commonDB.mysqlRead(sql, []);
  let boardItem = results.find(board123 => board123.id == id);
  res.render("board/board_view", {board : boardItem});
});

router.use('/write',function(req, res){
  res.render("board/board_write");
});

module.exports = router;

//select * from tb_board where id=${id}
//select * from tb_board whrer id=?, [id]