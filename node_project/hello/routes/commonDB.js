//board.js에서 디비접근, member.js 디비접근 ㄴㄴ -- 디비에 데이터 읽고 쓰기 전문 코드
//db 아이피, 계정이 바뀌는 경우 모든 파일에서 수정해줘야 함.

var mysql = require("mysql");
const DBInfo = {
    connectionLimit : 10,
    host : "localhost",
    user : "user01",
    password : "1234",
    database : "mydb",
    port : 3306
};
let readpool = mysql.createPool(DBInfo);

async function mysqlRead(sql, params){
    let promise = new Promise((resolve, reject) => {
        readpool.getConnection((err,conn) => {
            if(err){
                console.log(err);
                reject(err);
            }
            conn.query(sql, params, (err, rows) => {
                console.log(sql);
                console.log(rows);
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
                conn.release();
            })
        })
    });
    await promise;
    return promise;
}

exports.mysqlRead = mysqlRead;