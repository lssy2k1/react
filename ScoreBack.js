var express = require('express');
var router = express.Router();
let commonDB = require('./commonDB');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '성적' });
});

router.get('/list', async function(req, res, next){
    try{
        let sql = `SELECT A.id, A.score_name, A.score_kor, A.score_mat, A.score_eng
                    , DATE_FORMAT(A.wdate, '%Y-%m-%d') wdate
                    FROM tb_score A;`
        let results = await commonDB.mysqlRead(sql)
        console.log(results);
        res.json({"result":"success", "scoreList" : results})
    }
    catch(e){
        console.log(e);
    }
})

module.exports = router;
