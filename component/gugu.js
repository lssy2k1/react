//동작안함. gugudan확인하기
import React, { useState } from 'react'

function Gugu(){
    const [dan, setDan] = useState("2");
    const [numList] = useState([1,2,3,4,5,6,7,8,9]);
    const danChange = (e) => {
        setDan(e.target.value)
    }
    const goGugu = (index) => {
        numList[index] * {dan};
    }

    return(
        <div>
        단 : <input type = "text" onChange={danChange}/>
        <button type = "button" onClick = {goGugu}>버튼</button>    
        <ul>
            {
                numList.map((num) => {
                    return (
                        <li>
                        {dan} * {num} = {num * dan}
                        </li>
                    )
                })
            }
        </ul>
        </div>
    )
}

export default Gugu