var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host : "127.0.0.1",
    user : "user01",
    password : "1234",
    database : "mydb",
    port : 3306
});

//DB와 연결을 한다
pool.getConnection((err, connection) => {
    //DB와 연결을 성공하면 매개변수로 전달된 함수가 호출된다.
    //err - DB와 연결실패시 처리
    if(err){
        console.log(err);
        return;
    }
    //연결 성공시 연결객체 connection을 전달한다.
    //연결 객체
    console.log("connection success");

    new Promise((resolve, reject) => {
        sql = `
        insert into tb_board(title, writer, contents, wdate)
            values(?,?,?,now())
            `;
    let params = ['제목3', '장길산', '내용3'];
    connection.query(sql, params, (err, rows) => {
        if (err)
            reject("db오류");
        else
            resolve("success");//then구문으로 이동한다.
    })
    })
    .then((result) => {
        sql = "select * from tb_board";
        connection.query(sql, (err, rows) => {
            if (err)
                console.log("err");
            else
                console.log(rows);
            })
    })
    .catch((error) => {
        console.log(err);
    })


});
//비동기식의 단점. insert와 select중 어느게 먼저 실행이 될 지 모름.
//제작 코드 : 시간이 오래 걸리는 일을 하는 동작.을 기술한 코드
//소비 코드 : 제작코드를 기다렸다가 소비하는 코드
//프라미스 : 제작코드와 소비 코드를 연결해주는 특별한 js객체.
//           제작코드외 다른 코드를 따로 모아서 실행을 해주게 함.
//           자바스크립트의 비동기처리에 사용되는 객체. 콜백안의 콜백안의 콜백안의 콜백함수 등 비합리적인 상황 방지.
//동기식 : 서버에서 데이터가 올 때까지 정지가 됨.
console.log("end");
