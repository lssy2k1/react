import React, { useState} from 'react';
import CalScore from './과제과제2';

function GetScore(props){
    const [name, setName] = useState("기본값");
    const [kor, setKor] = useState(0);
    const [eng, setEng] = useState(0);
    const [mat, setMat] = useState(0);
    const nameChange = (e) =>{
        setName(e.target.value);
    }
    const korChange = (e) =>{
        setKor(Number(e.target.value));
    }
    const engChange = (e) =>{
        setEng(Number(e.target.value));
    }
    const matChange = (e) =>{
        setMat(Number(e.target.value));
    }
    return(
        <div>
            이름 : <input type = "text" onChange = {nameChange}/><br/>
            국어 : <input type = "text" onChange = {korChange}/><br/>
            영어 : <input type = "text" onChange = {engChange}/><br/>
            수학 : <input type = "text" onChange = {matChange}/><br/>
            <CalScore name = {name} kor = {kor} eng = {eng} mat = {mat}/>
        </div>
    )
}

export default GetScore;