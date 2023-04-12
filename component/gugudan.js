import React, { useState } from 'react'

function Gugudan(){
    const [dan, setDan] = useState("2");
    const [numList] = useState([1,2,3,4,5,6,7,8,9]);
    const [show, setShow] = useState(false);//show가 true일때만 화면에 구구단 출력

    const danChange = (e) => {
        setShow(false);//show를 false로 해서 화면에 출력을 막음
        setDan(e.target.value)
    }

    const goConfirm = () => {
        setShow(true);//확인버튼 누르면 화면에 출력하도록.
    }
    return(
        <div>
        단 : <input type = "text" onChange={danChange}/><br/>
        <button type = "button" onClick = {goConfirm}>확인</button>    
        <br/><br/>
        <ul>
            {
            show?
                numList.map((num , index) => {
                    return (
                        <li key = {index}>
                        {dan} * {num} = {num * dan}
                        </li>
                    )
                }):""
        }
        </ul>
        </div>
    )
}

export default Gugudan