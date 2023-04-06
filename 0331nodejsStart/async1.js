async function sigma(limit){
    sum = 0;
    for (i =1 ; i <= limit ; i++){
        sum += i;
    }
    return sum;
}

//console.log(sigma(100));//async로 인해서 무조건 Promise객체로 바뀌어 전달된다.

async function showDisplay(){
// sigma(100)
// .then((result) => {
//     console.log(result);
// })
    let result = await sigma(1000);//기다린다. 반환값이 프라미스 객체가 아니다.
    console.log(result);
}

showDisplay();