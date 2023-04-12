import React, { useState } from 'react';

function Fortest2(props){
    const[fruitList, setFruitList] = useState(["사과", "배", "포도", "수박", "머루", "배"]);
    const[fruit, setFruit] = useState("");

    //input태그에서 값 입력하면 fruit변수에 값을 저장한다.
    const onChange = (e) => {
        setFruit(e.target.value);
    }
    //추가 버튼을 누르면 fruit변수의 값을 fruitList에 추가한다.
    const goAppend = () => {
        //배열에 push함수 사용 못함.
        //배열자체를 새로 만들어 바꿔치기를 해야한다.
        //push : 원래 배열 메모리에 추가
        //concat : 새로운 배열을 만들어서 기존 배열 내용 복사하고 하나에 추가.
        setFruitList( fruitList.concat(fruit) );
        setFruit("");//input태그 공백채우기
    }
    //동적으로 태그를 추가해주는 게 아니라 '데이터 바꿔치기 위주!'
    //태그를 추가해주는건 리액트가 알아서 한다.
    const goSelect = ((index) => {
        alert(fruitList[index]);
    })
    return(
        <div>
            <input type = "text" onChange={onChange} value = {fruit}/>
            <button type = "button" onClick={goAppend}>추가하기</button>
            <ul>
            {
                fruitList.map( (item, index) => {
                    return(
                        <li key = {index}>
                            <a href = "#none" onClick={ () => {goSelect(index)}}>{item}</a>
                        </li>
                    );
                }
                )
            }
            </ul>
        </div>
        )
}

export default Fortest2