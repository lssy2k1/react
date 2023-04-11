import React, { useState } from 'react';

function CalScore(props){
    const[total, setTotal] = useState(0);
    const[avg, setAvg] = useState(0);
    
    const calTotal = (e) => {
        setTotal(props.kor + props.eng + props.mat);
    }
    const calAvg = (e) => {
        setAvg((props.kor + props.eng + props.mat) / 3);
    }
    return(
        <div>
            <button type = "button" onClick = {calTotal}>총점</button>
            <button type = "button" onClick = {calAvg}>평균</button>
            <p>이름 : {props.name}<br/> 총점 : {total}<br/> 평균 : {avg}</p>
        </div>
    )
}

export default CalScore;