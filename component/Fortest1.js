import React, { useState } from 'react';

function Fortest1(props){
    const[fruitList] = useState(["사과", "배", "포도", "수박", "머루", "배"]);
    const goSelect = ((index) => {
        alert(fruitList[index]);
    })
    return(
        <div>
            <ul>
            {
                fruitList.map( (item, index) => {
                    return(
                        <li key = {index}>
                            <a href = "#none" onClick={ () => {goSelect(index)}}>{item}</a>
                            {/* #none은 눌렀을 때 이동이 없도록 하는것
                            () => 를 이용해 함수가 호출될 때 주소값을 줘야한다.
                            그냥 함수를 호출하면 렌더링할 때 호출이 되어(html을 읽을 때 전부 실행이됨.)
                            호출 방식이 달라지게 된다.*/}
                        </li>
                    );
                }
                )
            }
            </ul>
        </div>
        )
}

export default Fortest1