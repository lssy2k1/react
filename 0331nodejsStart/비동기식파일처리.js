let fs = require("fs");

//비동기식, 파일을 읽기 전에 함수가 반호나되어서 반환 값을 사용할 수 없다.
fs.readFile("./hello.js", "utf-8", (err, data) =>{
    //이 함수는 파일을 모두 읽은 후 시스템에 의해 호출된다.
    console.log(data);
})
console.log("프로그램 완료");