// connection.query(sql, params, (err, rows) => {
//     if (err)
//         console.log("err");
//     else
//         console.log("insert 성공");
//     //connection.release();//연결해제
// })

// sql = "select * from tb_board";
// connection.query(sql, (err, rows) => {
//     if (err)
//         console.log("err");
//     else
//         console.log(rows);
//     });

let promise = new Promise((resolve, reject) => {
    //여기서 시간이 많이 걸리는 코드를 둔다.
    //성공하면 resolve(전달할 데이터) => then에 콜백함수의 매개변수로 전달된다.
    //resolve("success");
    reject("error");
})
.then((result ) => {
    console.log("then", result);
})
.catch((error) => {
    console.log("catch", error);
});

//https://url.kr/p2zobs //강사님 파일 주소.
//https://axios-http.com/kr/docs/intro //react는 axios를 사용하여 통신을 담당. react는 jquery의 경쟁자임.

//의존성 프로퍼티 : 버튼을 만들면 객체가 100개가 생긴다라고 했을 때, 10개를 만들면 1000개가 생겨.
//그대신 공통변수가 생기게 되고 비효율성이 생김. 따라서 공통변수는 생성하지 않고 쳐다보게만 만든다.
//조금 다르게 만들 경우 변경된 부분만 저장을 해줌.
//ms에서 이 방식을 통해 내부적으로 객체 저장방식을 구축했다. 우리는 구축할 필요가 없음.
