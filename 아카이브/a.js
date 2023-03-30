fetch("data.json", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    console.log("success", data); // fetch 한 데이터

    for (let i = 0; i < data.data.length; i++) {
      // for문, forEach는 i 접근 불가
      const text =
        `이름 : ${data.data[i].name}, ` +
        `근무시간 : ${data.data[i].hour}, ` +
        `시간당급여액 : ${data.data[i].payPerHour.toLocaleString()}, ` + // toLocaleString() : 40000 -> 40,000
        `총액 : ${(
          data.data[i].hour * data.data[i].payPerHour
        ).toLocaleString()}`;

      console.log(text); // 콘솔창
      document.querySelectorAll(".console")[i].innerText = text; // html 화면
    }
  })
  .catch((error) => {
    console.log("error", error);
  });

// queryselectorAll.map() 이렇게 사용 불가
// https://developer-kade.tistory.com/136
// https://stackoverflow.com/questions/2600343/why-does-document-queryselectorall-return-a-staticnodelist-rather-than-a-real-ar
// https://velog.io/@remon/fetch-%ED%86%B5%EC%8B%A0-%EC%A4%91-is-not-valid-JSON-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0
