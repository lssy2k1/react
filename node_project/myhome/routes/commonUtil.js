function getPaging(pg, totalCnt, pageGroupSize=10){
/*                                           그룹번호
    1  2  3  4  5  6  7  8  9  10    0~9        1  1, 10 //계산의 용이성을 위해 1뺴서 0~9함.
    11 12 13 14 15 16 17 18 19 20    10~19      2  11, 20
    21 22 23 24 25 26 27             20~26      3  21, 30

    (1-1)/10*10     0/10*10 =0
    (2-1)/10*10     1/10*10 =0
    (4-1)/10*10     1/10*10 =0
    (8-1)/10*10     1/10*10 =0
    (9-1)/10*10     1/10*10 =0
    (10-1)/10*10    =0
    (11-1)/10*10    =10 
    (12-1)/10*10    =10
    (15-1)/10*10    =10
    (21-1)/20*10    =20
    전체페이지 개수, 어느 그룹에 속하는지 확인해야 한다.
*/
    pnTotal = Math.ceil(totalCnt/10); //전체 페이지 개수
    //한페이지당 데이터가 10개일 때 15건, 2페이지
    //강제올림.

    pgGroupStart = parseInt((pg-1)/pageGroupSize)*pageGroupSize +1; //parseInt는 소수점 자르려고 사용함.
    pgGroupEnd = pgGroupStart + 10;
    if(pgGroupEnd > pnTotal){
        pgGroupEnd = pnTotal + 1;
    }
    console.log(pg, pgGroupStart,pgGroupEnd);

    //함수는 반환값이 하나여야 한다.
    return{pnTotal : pnTotal, pnStart: pgGroupStart, pnEnd : pgGroupEnd, pg:pg};
}
for (i = 1; i<=30; i++){
getPaging(i, 320);
};

exports.getPaging = getPaging;